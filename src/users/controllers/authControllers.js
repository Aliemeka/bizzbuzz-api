const { handleValidationErrors } = require('../../../utils/errorHandlers'); 
const { createUser, 
    loginUser, 
    updatePassword, 
    generateResetLink,
    createNewPassword } = require("../services/authService");

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * Register a new user using {@link login}
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * 
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Changes user's password
 * 
 */
module.exports.changePassword = async (req, res)=>{
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    try{
        const message = await updatePassword(currentPassword, newPassword, id);
        res.status(201).json({ success: true, message });
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Generates a link to reset the password
 */
module.exports.resetPassword = async (req, res)=>{
    const { email } = req.body;

    try{
        const link = await generateResetLink(email);
        res.status(200).json({ success: true, redirectUrl: link });
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Confirms the reset link and restes the users password
 */
module.exports.confirmPasswordReset = async (req, res) =>{
    const id = req.query.id;
    const { password } = req.body;

    try{
        const message = await createNewPassword(password, id);
        res.status(201).json({ success: true, message });
    }
    catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}