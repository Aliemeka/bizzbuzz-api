const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Token = require("../src/users/models/tokenModel")

const { SECRET } = require("../utils/config")

// Requires thta request comes from authenticated user
module.exports.requireAuth = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403).json({ success: false, message: "Unauthorized request" });
            }
            else{
                req.user = user;
                next();
            }
        });
    }
    else{
        res.sendStatus(403).json({ success: false, message: "Authorization token is required in request header"})
    }
}

// Authorizes reset token sent by user
module.exports.authorizeReset = async(req, res, next)=>{
    const {token, id} = req.query;
    if(token){
        const resetToken = await Token.findOne({ userId: id })
        if(!resetToken){
            return res.sendStatus(403).json({ success: false, message: "Invalid or expired token"});
        }
        const isValid = await bcrypt.compare(token, resetToken.token)
        if(!isValid) {
            return res.sendStatus(403).json({ success: false, message: "Invalid or expired token"});
        }
        req.user = id;
        next();
    }
    else{
        return res.sendStatus(403).json({ success: false, message: "Token is required"})
    }
    
}