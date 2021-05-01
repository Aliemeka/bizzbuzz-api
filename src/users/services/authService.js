const User = require("../models/userModels")
const { createToken } = require('../../../utils/auth');
const bcrypt = require('bcrypt')

module.exports.createUser = async (username, email, password) =>{
    try{
       const user = await User.create({ username, email, password });
       const token = createToken(user._id);
       return { id: user._id,  username: user.username, token }
    }
    catch(err){
        throw err;
    }
}


module.exports.loginUser = async (login, password) =>{
    try{
       const user = await User.login(login, password);
       const token = createToken(user._id);
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


