const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const AuthService = require('../services/AuthService');
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('../services/TBankHeaderService');

class UserController {
    static async login(userID, pin, otp, callback = (status, payload) => {}) {
        try {
            if (!userID || !pin) {
                callback(400, {
                    "message": 'UserID and PIN are required'
                });
            } else if (!otp) {
                const { header } = tBankHeaders.requestOTP(userID, pin);
                const reqURL = `${ tBankURL }?Header=${header}`;
                axios
                    .get(reqURL)
                    .then(response => {
                        const { data } = response;
                        const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                        
                        if (globalErrorID === "010000") {
                            callback(418, {
                                "message": 'OTP is required'
                            });
                        } else {
                            callback(401, {
                                "message": 'Invalid Login Details'
                            });
                        }
                    });
                
            } else {
                const { header } = tBankHeaders.loginCustomer(userID, pin, otp);
                const reqURL = `${ tBankURL }?Header=${header}`;
                axios
                    .get(reqURL)
                    .then(response => {
                        const { data } = response;
                        const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                        
                        if (globalErrorID === "010000") {
                            const customerID = data.Content.ServiceResponse["Login_OTP_Authenticate-Response"]["CustomerID"]
                            this.initialLogin(customerID, userID, pin, OTP);
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
    
    static initialLogin(customerID, userID, pin, OTP) {
        const portfolioController = require('./PortfolioController');
        const user = this.registerUser(userID);
        const interestedAccounts = portfolioController.getCustomerAccounts(userID, pin, OTP);
        const interestedTransactions = []
        for (const accountID of interestedAccounts) {
            interestedTransactions.concat( portfolioController.getTransactionHistory(userID, pin, OTP, accountID) );
        }
    }
    
    
    static async registerUser(userID) {
        try {
            const user = await prisma.user.upsert({
                data: {
                    userID: userID
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }


    // static async login(username, password, callback = (status, payload) => {}) {
    //     const validationError = []
    //     username ? null : validationError.push('username cannot be empty')
    //     password ? null : validationError.push('password cannot be empty')

    //     if (validationError.length == 0) {
    //         try {
    //             const user = await prisma.user.findUnique({
    //                 where: {
    //                     username: username,
    //                 }
    //             });

    //             if (user) {
    //                 const isMatch = AuthService.verifyHash(password, user.pHash);
    //                 if (isMatch) {
    //                     callback(200, {
    //                         message: 'Login Success',
    //                         user: user
    //                     })
    //                 } else {
    //                     callback(401, {
    //                         message: 'Invalid Password'
    //                     })
    //                 }
    //             } else {
    //                 callback(404, {
    //                     message: 'User not found'
    //                 })
    //             }

    //         } catch (error) {
    //             console.error(error)
    //             callback(500, {
    //                 "error": error.message  
    //             })
    //         }

    //     } else {
    //         callback(400, {
    //             "error": validationError
    //         })
    //     }
    // }

    // static async register(username, password, callback = (status, payload) => {}) {
    //     // Add more user details later. Pass over by JSON object

    //     const validationError = []
    //     username ? null : validationError.push('username cannot be empty')
    //     password ? null : validationError.push('password cannot be empty')

    //     if (validationError.length == 0) {
    //         try {
    //             const user = await prisma.user.create({
    //                 data: {
    //                     username: username,
    //                     pHash: AuthService.generateHash(password)
    //                 }
    //             });

    //             callback(201, {
    //                 message: 'User created',
    //                 user: user
    //             })
    //         } catch (error) {
    //             console.error(error)
    //             callback(500, {
    //                 "error": error.message  
    //             })
    //         }

    //     } else {
    //         callback(400, {
    //             "error": validationError
    //         })
    //     }
    // }
}

module.exports = UserController;