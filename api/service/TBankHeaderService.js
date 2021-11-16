class TBankHeaderService {
    static requestOTP(userID, pin) {
        return {
            "serviceName": "requestOTP",
            "userID": userID,
            "PIN": pin
        }
    }

    
    static getCustomerAccounts(userID, pin, otp) {
        return {
            "serviceName": "getCustomerAccounts",
            "userID": userID,
            "PIN": pin,
            "OTP": otp
        }
    }
}


module.exports = TBankHeaderService;