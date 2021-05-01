module.exports.handleValidationErrors = error =>{
    let errors = {};
    if(error.errors){
        Object.values(error.errors).forEach(({ properties }) =>{
            errors[properties.path]= error.message
        });
    };
    if(error.code === 11000){
        errors.message = "User already exist"
    }
    return errors;
}