const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('../services/TBankHeaderService');


class ProductController {
    static async getInterestRate(callback = (status, payload) => {}) {
        try {
            const { header } = tBankHeaders.getBenchmarkInterestRates();
            const reqURL = `${ tBankURL }?Header=${header}`;
            axios
                .get(reqURL)
                .then(response => {
                    const { data } = response;
                    const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                    
                    if (globalErrorID === "010000") {
                        const interestRates = response.data.Content.ServiceResponse.InterestRateList.InterestRateItem;
                        let sgBenchmarkInterestRates = [];
                        for (let info of interestRates){
                            if (info.country == 'Singapore' && info.period !== "1M"){
                                sgBenchmarkInterestRates.push({
                                    "interestRate":(info.interestRate * 0.9).toFixed(4), 
                                    "period":info.period,
                                })
                            }
                        }
                        // this.initialLogin(customerID, userID, pin, OTP);
                        callback(200, {
                            "message": 'Successfully called API',
                            "productInterestRates": sgBenchmarkInterestRates
                        });
                    } else if (globalErrorID !== "010010") {
                        callback(401, {
                            "message": 'Error retrieving API'
                        });
                    } 
                    // else {
                    //     callback(401, {
                    //         "message": 'Invalid Login Details'
                    //     });
                    // }
                });
        } catch (error) {
            callback(500, {
                "message": 'Internal server error'
            });
        }
    }
    
    // static initialLogin(customerID, userID, pin, OTP) {
    //     const portfolioController = require('./PortfolioController');
    //     const user = this.registerUser(userID);
    //     const interestedAccounts = portfolioController.getCustomerAccounts(userID, pin, OTP);
    //     const interestedTransactions = []
    //     for (const accountID of interestedAccounts) {
    //         interestedTransactions.concat( portfolioController.getTransactionHistory(userID, pin, OTP, accountID) );
    //     }
    // }
    
    
    // static async registerUser(userID) {
    //     try {
    //         const user = await prisma.user.upsert({
    //             data: {
    //                 userID: userID
    //             }
    //         });
    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}


module.exports = ProductController;