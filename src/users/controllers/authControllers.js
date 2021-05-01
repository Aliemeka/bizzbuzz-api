const { handleValidationErrors } = require('../../../utils/errorHandlers'); 
const { createUser, 
    loginUser, 
    updatePassword, 
    generateResetLink } = require("../services/authService");


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
            res.status(500).json({ success: false, error: "Error creating user" });
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

module.exports.changePassword = async (req, res)=>{
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    try{
        const message = await updatePassword(currentPassword, newPassword, id)
        res.status(201).json({ success: true, message })
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}

module.exports.resetPassword = async (req, res)=>{
    const { email } = req.body

    try{
        const link = await generateResetLink(email)
        res.status(200).json({ success: true, redirectUrl: link })
    }
    catch(errpr){
        res.status(400).json({ success: false, error: error.message });
    }
}