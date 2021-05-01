const User = require("../models/userModels")
const { createToken } = require('../../../utils/auth');

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