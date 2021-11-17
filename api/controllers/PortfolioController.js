const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');

class PortfolioController {
    static async getCustomerAccounts(userID, callback = (status, payload) => {}) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        
        if (validationError.length == 0) {
            try {
                const accounts = await prisma.account.findMany({
                    where: {
                        userID: userID
                    }
                });
                
                callback(200, {
                    "accounts": accounts
                });
            } catch (error) {
                callback(500, {
                    "error": error.message
                });
            }
        } else {
            callback(400, {
                "error": validationError
            });
        }
    }
    
    
    static async getTransactionHistory(userID, callback = (status, payload) => {}) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        
        if (validationError.length == 0) {
            try {
                const transactions = await prisma.transaction.findMany({
                    where: {
                        account: {
                            ownerID: userID
                        }
                    }
                });
                
                callback(200, {
                    "transactions": transactions
                });
            } catch (error) {
                callback(500, {
                    "error": error.message
                });
            }
        } else {
            callback(400, {
                "error": validationError
            });
        }
    }
    
    
    static async getQualifyTransactions(userID, callback = (status, payload) => {}) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        
        if (validationError.length == 0) {
            try {
                const transactions = await prisma.transaction.findMany({
                    where: {
                        account: {
                            ownerID: userID
                        },
                        amount: {
                            gte: 5000
                        }
                    }
                });
                
                callback(200, {
                    "transactions": transactions
                });
            } catch (error) {
                callback(500, {
                    "error": error.message
                });
            }
        } else {
            callback(400, {
                "error": validationError
            });
        }
    }
    
}

module.exports = PortfolioController;