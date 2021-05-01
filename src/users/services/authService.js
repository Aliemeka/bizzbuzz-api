const User = require("../models/userModels")
const Token = require("../models/tokenModel")
const { createJWT, generateToken } = require('../../../utils/auth');
const { CLIENT_URL } = require('../../../utils/config')
const bcrypt = require('bcrypt')

module.exports.createUser = async (username, email, password) =>{
    try{
       const user = await User.create({ username, email, password });
       const token = createJWT(user._id);
       return { id: user._id,  username: user.username, token }
    }
    catch(err){
        throw err;
    }
}


module.exports.loginUser = async (login, password) =>{
    try{
       const user = await User.login(login, password);
       const token = createJWT(user._id);
       return { id: user._id,  username: user.username, token }
    }
    catch(err){
        throw err;
    }
}


module.exports.resetPassword = async(token, password) =>{
    const id = verifyToken(token)
    if(id){
        const user = await User.findById(id);
        if(user){
            user.updateOne({ password })
        }
        throw Error("Invalid request");
    }
    throw Error("Unauthorized request");
}

module.exports.updatePassword = async(currentPassword, newPassword, id)=>{
    try{
        const user = await User.findById(id);
        if(user){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch) throw Error("Current password is in correct");
            user.password = newPassword;
            await user.save();
            return "Password successfully changed";
        }
        throw Error('Invalid user');
    }
    catch(err){
        throw Error(err);
    }
}

module.exports.generateResetLink = async (email) =>{
    try{
        // Confirm the user exist
        const user = await User.findOne({ email });
        if(!user) throw Error("Email is does not belong to a registered user");

        // Deletes existing rest token
        const token = await Token.findOne({ userId: user._id })
        if(token) await token.deleteOne();

        // Generates new reset token and save in data base
        const resetToken = generateToken();
        const salt = await bcrypt.genSalt();
        const hashedToken = await bcrypt.hash(resetToken, salt)
        await Token.create({
            userId: user._id,
            token: hashedToken
        });
        const link = `${CLIENT_URL}/confirm-reset?token=${resetToken}`;
        return link;
    }
    catch(err){
        throw Error(err);
    }
} 
