const jwt = require("jsonwebtoken")

const { SECRET } = require("../utils/config")

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