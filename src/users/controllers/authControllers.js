const { createUser } = require("../services/authService")
const { handleValidationErrors } = require('../../../utils/errorHandlers')

module.exports.register = async(req, res) =>{
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try{
        const user = await createUser(username, email, password);
        if(user) res.status(201).json(user);
    }
    catch(err){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(400).json({ errors });
        }
        else{
            res.status(500).json({ error: "Error creating user account"});
        }
    }
}