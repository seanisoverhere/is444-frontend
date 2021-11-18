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
                const reqURL = `${tBankURL}?Header=${JSON.stringify(header)}`;

                try {
                    const { data } = await axios.get(reqURL);
                    const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;

                    if (globalErrorID === "010000") {
                        const accounts = data.Content.ServiceResponse.AccountList.account;
                        const interestedAccount = [];
                        const interestedAccountsID = [];
                        

                        for (const account of accounts) {
                            if (account.productID === "101" && account.currency === "SGD") {
                                interestedAccount.push(account);
                            }
                        }


                        if (interestedAccount.length > 0) {
                            for (const account of interestedAccount) {
                                const custAccountID = account.accountID.substring( account.accountID.lastIndexOf('0') + 1 );
                                interestedAccountsID.push(custAccountID);
                                try {
                                    const dbAccount = await prisma.account.upsert({
                                        where: {
                                            accountID: custAccountID
                                        },
                                        update: {
                                            accountID: custAccountID,
                                            balance: parseFloat(account.balance),
                                            ownerID: userID
                                        },
                                        create: {
                                            accountID: custAccountID,
                                            balance: parseFloat(account.balance),
                                            ownerID: userID
                                        }
                                    });
                                } catch (error) {
                                    console.error(error)
                                }
                            }
                        }

                        
                        return interestedAccountsID;

                    } else {
                        return {
                            "success": false,
                            "message": "Invalid login information"
                        }
                    }
                } catch (error) {
                    console.error(error);
                    return {
                        "success": false,
                        "message": error.message
                    }
                }

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
                const reqURL = `${tBankURL}?Header=${JSON.stringify(header)}&Content=${JSON.stringify(content)}`;

                try {
                    const { data } = await axios.get(reqURL);
                    const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;

                    if (globalErrorID === "010000") {
                        const interestedTransactions = [];
                        const transactionsObj = data.Content.ServiceResponse.CDMTransactionDetail;
                        
                        if (Object.keys(transactionsObj).length === 0) {
                            return interestedTransactions;
                        }
                        
                        let transactions  = transactionsObj.transaction_Detail;
                        
                        if (!Array.isArray(transactions)) {
                            transactions = [transactions];
                        } 
                        
                        
                        for (const transaction of transactions) {
                            const transactionAmount = parseFloat(transaction.transactionAmount);
                            
                            if (transactionAmount >= 5000) {
                                interestedTransactions.push(transaction.transactionID);
                            }
                            
                            await prisma.transaction.upsert({
                                where: {
                                    transactionID: transaction.transactionID
                                },
                                update: {
                                    transactionID: transaction.transactionID,
                                    accountID: accountID,
                                    amount: transactionAmount,
                                    currency: transaction.currency,
                                    date: new Date(transaction.transactionDate),
                                    description: transaction.narrative ? transaction.narrative : "No description"
                                },
                                create: {
                                    transactionID: transaction.transactionID,
                                    accountID: accountID,
                                    amount: transactionAmount,
                                    currency: transaction.currency,
                                    date: new Date(transaction.transactionDate),
                                    description: transaction.narrative ? transaction.narrative : "No description"
                                }
                            }); 
                        }
                        
                        return interestedTransactions;

                    } else {
                        return {
                            "success": false,
                            "message": "Invalid login information"
                        }
                    }
                } catch (error) {
                    console.error(error);
                    return {
                        "success": false,
                        "message": error.message
                    }
                }
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