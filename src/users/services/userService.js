const User = require("../models/userModels");

module.exports.findUser = async (id)=>{
    try{
        const user = await User.findById(id)
        if(!user){
            throw Error("User doesn't exist");
        }
        return user;
    }
    catch(error){
        throw error
    }
}