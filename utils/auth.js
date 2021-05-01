const jwt = require("jsonwebtoken");
const { SECRET } = require("./config")

module.exports.createToken = (id) =>{
    return jwt.sign({ id }, SECRET, {
        expiresIn: 18000
    })
}