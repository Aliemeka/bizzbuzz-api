module.exports.handleValidationErrors = error =>{
    let errors = {};
    if(error.errors){
        Object.values(error.errors).forEach(({ properties }) =>{
            errors[properties.path]= error.message
        });
    };
    return errors;
}