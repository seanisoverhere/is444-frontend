const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('../service/TBankHeaderService');


class ProductController {
    static async getInterestRate(callback = (status, payload) => {}) {
        try {
            const { header } = tBankHeaders.getBenchmarkInterestRates();
            const reqURL = `${ tBankURL }?Header=${JSON.stringify(header)}`;
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
                                const tenureMapping = {
                                    "3M": 3,
                                    "6M": 6,
                                    "1Y": 12,
                                }
                                
                                sgBenchmarkInterestRates.push({
                                    "interestRate":(info.interestRate * 0.9).toFixed(4), 
                                    "period":tenureMapping[info.period],
                                })
                            }
                        }
                        // this.initialLogin(customerID, userID, pin, OTP);
                        callback(200, {
                            "message": 'Successfully called API',
                            "productInterestRates": sgBenchmarkInterestRates
                        });
                    } else {
                        callback(500, {
                            "message": 'Error retrieving API'
                        });
                    } 
                });
        } catch (error) {
            callback(500, {
                "message": 'Internal server error'
            });
        }
    }
}


module.exports = ProductController;