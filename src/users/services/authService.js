const User = require("../models/userModels")

module.exports.createUser = async (username, email, password) =>{
    try{
       return await User.create({ username, email, password });
    }
    catch(err){
        throw err;
    }
}