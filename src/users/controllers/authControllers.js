const { createUser, loginUser } = require("../services/authService");
const { handleValidationErrors } = require('../../../utils/errorHandlers');


module.exports.register = async(req, res) =>{
    const { username, email, password } = req.body;

    try{
        const user = await createUser(username, email, password);
        res.status(201).json({ success: true, user });
    }
    catch(err){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(400).json({ success: false, errors });
        }
        else{
            res.status(500).json({ success: false, error: "Error creating user account"});
        }
    }
}

module.exports.login = async(req, res)=>{
    const { login, password } = req.body;
    try{
        const user = await loginUser(login, password);
        res.status(201).json({ success: true, user }); 
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}