const fs = require('fs');
const privateKey = fs.readFileSync('../keys/private.key');
const publicKey = fs.readFileSync('../keys/public.key');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const signOptions = {
    issuer: process.env.ACCESS_TOKEN_ISSUER,
    subject: process.env.ACCESS_TOKEN_SUBJECT,
    audience: process.env.ACCESS_TOKEN_AUDIENCE,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    algorithm: process.env.ACCESS_TOKEN_ALGORITHM
};

const verifyOptions = {
    issuer: process.env.ACCESS_TOKEN_ISSUER,
    subject: process.env.ACCESS_TOKEN_SUBJECT,
    audience: process.env.ACCESS_TOKEN_AUDIENCE,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    algorithm: [process.env.ACCESS_TOKEN_ALGORITHM]
};

class AuthService {
    static authenticate(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token == null) {
            return res.sendStatus(401);
        } 

        jwt.verify(token, publicKey, verifyOptions, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }

            const user = {
                "username": payload.username
            };

            req.user = user;
            next();
        });
    }

    
    static generateJWT(payload) {
        return jwt.sign(payload, privateKey, signOptions);
    }
    
    
    static generateHash(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    
    static verifyHash(password, dbHash) {
        return bcrypt.compareSync(password, dbHash);
    }
}


module.exports = AuthService;
