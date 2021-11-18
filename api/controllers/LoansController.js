const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');

const ProductController = require('./ProductController');
const LoanService = require('../service/LoanService');

class LoansController {
    static async approveLoan(userID, accountID, loanAmt, loanTenure, callback = (status, payload) => {}) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        loanAmt ? null : validationError.push('loanAmt is empty');
        loanTenure ? null : validationError.push('loanTenure is empty');
        
        if (validationError.length == 0) {
            ProductController.getInterestRate(async (status, payload) => {
                if (status === 200) {
                    const interestRates = payload.productInterestRates;
                    const loanInterestRate = interestRates.find(interestRate => interestRate.period === loanTenure).interestRate;
                    
                    const totalLoanAmt = loanAmt + (loanAmt * (loanInterestRate / 100));
                    const repaymentAmt = totalLoanAmt / loanTenure;
                    
                    const loan = await prisma.loan.create({
                        data: {
                            custId: userID,
                            loanAmount: Math.round((totalLoanAmt + Number.EPSILON) * 100) / 100,
                            loanTenure: loanTenure,
                            loanInterest: loanInterestRate,
                            repaymentAmt: Math.round((repaymentAmt + Number.EPSILON) * 100) / 100,
                            totalRepaymentAmt: 0
                        }
                    });
                    
                    const sentMoney = await LoanService.disperseLoanAmount(accountID, loanAmt)
                    if (sentMoney) {
                        callback(200, {
                            loanID: loan.id,
                            message: 'Loan approved successfully'
                        });
                    } else {
                        callback(500, {
                            error: 'Failed to disperse loan amount'
                        });
                    }
                }
            });
        } else {
            callback(400, {
                "error": validationError
            });
        }
    }
    
    static async getMyLoans(userID, callback = (status, payload) => {}) {
        const validationError = [];
        userID ? null : validationError.push('userID is empty');
        
        if (validationError.length == 0) {
            const loans = await prisma.loan.findMany({
                where: {
                    custId: userID
                }
            });
            
            callback(200, {
                loans: loans
            });
        } else {
            callback(400, {
                "error": validationError
            });
        }
    }
    
    
}

module.exports = LoansController;