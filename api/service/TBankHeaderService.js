class TBankHeaderService {
    static requestOTP(userID, pin) {
        return {
            "Header": {
                "userID": userID,
                "PIN": pin
            }
        }
    }
    
    static getCustomerAccounts(userID, pin, otp) {
        return {
            "Header": {
                "userID": userID,
                "PIN": pin,
                "OTP": otp
            }
        }
    }
}


module.exports = TBankHeaderService;