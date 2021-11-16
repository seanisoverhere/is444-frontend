const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('./TBankHeaderService');


class PortfolioService {
    static async getCustomerAccounts(userID, pin, otp) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        pin ? null : validationError.push('pin is empty');
        otp ? null : validationError.push('otp is empty');
        
        if (validationError.length == 0) {
            try {
                const { header } = tBankHeaders.getCustomerAccounts(userID, pin, otp);
                const reqURL = `${ tBankURL }?Header=${ header }`;
                axios
                    .get(reqURL)
                    .then(response => {
                        const { data } = response;
                        const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                        
                        if (globalErrorID === "010000") {
                            const accounts = data.Content.AccountList.account;
                            const interestedAccount = [];
                            
                            for (const account in accounts) {
                                if (account.productID === "101" && account.currency === "SGD"){
                                    interestedAccount.push(account.accountID);
                                }
                            }
                            
                            if (interestedAccount.length > 0) {
                                for (const accountId of interestedAccount) {
                                    await prisma.account.create({
                                        data: {
                                            accountID: accountId,
                                            ownerId: userID
                                        }
                                    });
                                }
                            }
                            
                            return interestedAccount;
                            
                        } else {
                            return {
                                "success": false,
                                "message": "Invalid login information"
                            }
                        }
                    });
            } catch (error) {
                console.error(error);
                return {
                    "success": false,
                    "message": error.message
                }
            }
        }
    }
    
    
    static async getTransactionHistory(userID, pin, otp, accountID) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        pin ? null : validationError.push('pin is empty');
        otp ? null : validationError.push('otp is empty');
        
        if (validationError.length == 0) {
            try {
                const { header, content } = tBankHeaders.getTransactionHistory(userID, pin, otp, accountID);
                const reqURL = `${ tBankURL }?Header=${ header }&Content=${ content }`;
                axios
                    .get(reqURL)
                    .then(response => {
                        const { data } = response;
                        const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                        
                        if (globalErrorID === "010000") {
                            const transactions = data.Content.ServiceResponse.CDMTransactionDetail.transaction_Detail;
                            const interestedTransactions = [];
                            
                            for (const transaction of transactions) {
                                if (transaction.transactionAmount >= 5000) {
                                    interestedTransactions.push(transaction.transactionID);
                                }
                                
                                await prisma.transaction.upsert({
                                    data: {
                                        transactionID: transaction.transactionID,
                                        accountID: accountID,
                                        amount: transaction.transactionAmount,
                                        currency: transaction.currency,
                                        date: transaction.transactionDate,
                                        description: transaction.narrative
                                    }
                                });
                            }
                            
                            return interestedTransaction;
                            
                        } else {
                            return {
                                "success": false,
                                "message": "Invalid login information"
                            }
                        }
                    });
            } catch (error) {
                console.error(error);
                return {
                    "success": false,
                    "message": error.message
                }
            }
        }
    }
    
}

module.exports = PortfolioService;