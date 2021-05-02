const jwt = require("jsonwebtoken");
const { SECRET } = require("./config")
const crypto = require("crypto")
const bcrypt = require("bcrypt")

module.exports.createJWT = (id) =>{
    return jwt.sign({ id }, SECRET, {
        expiresIn: 72000
    })
}

module.exports.generateToken = () =>{
    let resetToken = crypto.randomBytes(32).toString("hex");
    return resetToken;
}