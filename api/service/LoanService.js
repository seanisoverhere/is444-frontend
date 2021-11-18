const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('./TBankHeaderService');

const masterAccount = process.env.DEEZRUPT_TBANK_ACCOUNT
const masterPin = process.env.DEEZRUPT_TBANK_PIN
const masterOTP = process.env.DEEZRUPT_TBANK_OTP
const masterCASA = process.env.DEEZRUPT_TBANK_CASA

class LoanService {
    static async disperseLoanAmount(accountID, loanAmount) {
        const validationError = [];
        accountID ? null : validationError.push('accountID is empty');
        loanAmount ? null : validationError.push('loanAmount is empty');
        
        if (validationError.length == 0) {
            const addedBeneficiary = await this.addBeneficiary(accountID);
            
            if (addedBeneficiary) {
                const { header, content } = tBankHeaders.creditTransfer(masterAccount, masterPin, masterOTP, masterCASA, accountID, loanAmount);
                const reqURL = `${tBankURL}?Header=${JSON.stringify(header)}&Content=${JSON.stringify(content)}`;
                
                try {
                    const { data } = await axios.get(reqURL);
                    const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                    
                    if (globalErrorID === "010000") {
                        return true;
                    } else {
                        return false
                    }
                } catch (error) {
                    console.error(error)
                }
            } else {
                return false
            }
        } else {
            return false;
        }
    }
    
    static async addBeneficiary(accountID) {
        const validationError = [];
        accountID ? null : validationError.push('accountID is empty');
        
        if (validationError.length == 0) {
            const { header, content } = tBankHeaders.addBeneficiary(masterAccount, masterPin, masterOTP, accountID);
            const reqURL = `${tBankURL}?Header=${JSON.stringify(header)}&Content=${JSON.stringify(content)}`;
            
            try {
                const { data } = await axios.get(reqURL);
                const globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                if (globalErrorID === "010000") {
                    return true;
                } else {
                    return false
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            return false;
        }
    }
}

module.exports = LoanService;