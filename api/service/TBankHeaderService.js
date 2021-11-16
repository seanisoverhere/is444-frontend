
class TBankHeaderService {
    static requestOTP(userID, pin) {
        const header = {
            "serviceName": "requestOTP",
            "userID": userID,
            "PIN": pin
        };

        return { header };
    }
    
    
    static loginCustomer(userID, pin, otp) {
        const header = {
            "serviceName": "loginCustomer",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };
        
        return { header };
    }

    
    static getCustomerDetails(userID, pin, otp) {
        const header = {
            "serviceName": "getCustomerDetails",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };
        
        return { header };
    }
    
    
    static getCustomerAccounts(userID, pin, otp) {
        const header = {
            "serviceName": "getCustomerAccounts",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };

        return { header };
    }
    

    static getDepositAccounts(userID, pin, otp, accountID) {
        const header = {
            "serviceName": "getDepositAccountDetails",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };
        
        const content = {
            "accountID": accountID
        };
        
        return { header, content };
    }


    static getDepositAccountBalance(userID, pin, otp, accountID) {
        const header = {
            "serviceName": "getDepositAccountBalance",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };
        
        const content = {
            "accountID": accountID
        };
        
        return { header, content };
    }


    static getMonthlyBalanceTrend(userID, pin, otp, accountID, numberOfMonths) {
        const header = {
            "serviceName": "getMonthlyBalanceTrend",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };
        
        const content = {
            "accountID": accountID,
            "numMonths": numberOfMonths
        };
        
        return { header, content };
    }

    
    static getTransactionHistory(userID, pin, otp, accountID) {
        const today = new Date();
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        
        const todayISO = today.toISOString().split('T')[0] + ' 00:00:00';
        const monthAgoISO = monthAgo.toISOString().split('T')[0] + ' 00:00:00';
        
        const header = {
            "serviceName": "getTransactionHistory",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        };
        
        const content = {
            "accountID": accountID,
            "startDate": todayISO,
            "endDate": monthAgoISO,
            "numRecordsPerpage": 1000,
            "pageNum": 1
        };
        
        return { header, content };
    }
    
    static getBenchmarkInterestRates() {
        const header = {
            "serviceName": "getBenchmarkInterestRates",
            "userID": "",
            "PIN": "",
            "OTP": ""
        };
        
        return { header };
    }
    

}


module.exports = TBankHeaderService;