const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const AuthService = require('../services/AuthService');
const axios = require('axios');
const tBankURL = process.env.TBANK_URL
const tBankHeaders = require('../services/TBankHeaderService');

class UserController {
    static async login(userID, pin, otp, callback = (status, payload) => {})) {
        try {
            if (!otp){
                callback(418, {
                    message: 'OTP is required'
                });
            } else if (!userID || !pin){
                callback(400, {
                    message: 'UserID and PIN are required'
                });
            } else {
                const header = tBankHeaders.loginCustomer(userID, pin, otp);
                
                const reqURL = `${tBankURL}/api/v1/customer/accounts`;
                
            }
        } catch (error) {
            callback(500, {
                message: 'Internal server error'
            });
        }
    }
    
    
    // static async login(username, password, callback = (status, payload) => {}) {
    //     const validationError = []
    //     username ? null : validationError.push('username cannot be empty')
    //     password ? null : validationError.push('password cannot be empty')
        
    //     if (validationError.length == 0) {
    //         try {
    //             const user = await prisma.user.findUnique({
    //                 where: {
    //                     username: username,
    //                 }
    //             });
                
    //             if (user) {
    //                 const isMatch = AuthService.verifyHash(password, user.pHash);
    //                 if (isMatch) {
    //                     callback(200, {
    //                         message: 'Login Success',
    //                         user: user
    //                     })
    //                 } else {
    //                     callback(401, {
    //                         message: 'Invalid Password'
    //                     })
    //                 }
    //             } else {
    //                 callback(404, {
    //                     message: 'User not found'
    //                 })
    //             }
                
    //         } catch (error) {
    //             console.error(error)
    //             callback(500, {
    //                 "error": error.message  
    //             })
    //         }
            
    //     } else {
    //         callback(400, {
    //             "error": validationError
    //         })
    //     }
    // }
    
    // static async register(username, password, callback = (status, payload) => {}) {
    //     // Add more user details later. Pass over by JSON object
        
    //     const validationError = []
    //     username ? null : validationError.push('username cannot be empty')
    //     password ? null : validationError.push('password cannot be empty')
        
    //     if (validationError.length == 0) {
    //         try {
    //             const user = await prisma.user.create({
    //                 data: {
    //                     username: username,
    //                     pHash: AuthService.generateHash(password)
    //                 }
    //             });
                
    //             callback(201, {
    //                 message: 'User created',
    //                 user: user
    //             })
    //         } catch (error) {
    //             console.error(error)
    //             callback(500, {
    //                 "error": error.message  
    //             })
    //         }
            
    //     } else {
    //         callback(400, {
    //             "error": validationError
    //         })
    //     }
    // }
}

module.exports = UserController;