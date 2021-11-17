const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const AuthService = require('../services/AuthService');
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('../service/TBankHeaderService');

class UserController {
    static async login(userID, pin, otp, callback = (status, payload) => {}) {
        try {
            if (!userID || !pin) {
                callback(400, {
                    "message": 'UserID and PIN are required'
                });
            } else if (!otp) {
                const { header } = tBankHeaders.requestOTP(userID, pin);
                const reqURL = `${ tBankURL }?Header=${JSON.stringify(header)}`;
                axios
                    .get(reqURL)
                    .then(response => {
                        const { data } = response;
                        const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                        
                        if (globalErrorID === "010000") {
                            callback(200, {
                                "message": 'OTP is required',
                                "requireOTP": true 
                            });
                        } else {
                            callback(401, {
                                "message": 'Invalid Login Details'
                            });
                        }
                    });
                
            } else {
                const { header } = tBankHeaders.loginCustomer(userID, pin, otp);
                const reqURL = `${ tBankURL }?Header=${JSON.stringify(header)}`;
                axios
                    .get(reqURL)
                    .then(response => {
                        const { data } = response;
                        const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                        
                        if (globalErrorID === "010000") {
                            const customerID = data.Content.ServiceResponse["Login_OTP_Authenticate-Response"]["CustomerID"]
                            this.initialLogin(customerID, userID, pin, otp);
                            callback(200, {
                                "message": 'Login Successful'
                            });
                        } else if (globalErrorID === "010010") {
                            callback(401, {
                                "message": 'Invalid OTP'
                            });
                        } else {
                            callback(401, {
                                "message": 'Invalid Login Details'
                            });
                        }
                    });
            }
        } catch (error) {
            callback(500, {
                "message": 'Internal server error'
            });
        }
    }
    
    static async initialLogin(customerID, userID, pin, OTP) {
        const portfolioService = require('../service/PortfolioService');
        const user = await this.registerUser(userID);
        const interestedAccounts = await portfolioService.getCustomerAccounts(userID, pin, OTP);
        for (const accountID of interestedAccounts) {
            const transactions = await portfolioService.getTransactionHistory(userID, pin, OTP, accountID);
        }
    }
    
    
    static async registerUser(userID) {
        try {
            const user = await prisma.user.upsert({
                where: {
                    userID: userID
                },
                update: {
                    userID: userID
                },
                create: {
                    userID: userID
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserController;