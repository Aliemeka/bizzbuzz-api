const mongoose = require("mongoose");

const validators = require('@utils/validations');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: validators.nameValidator
    },
    email: {
        type: String,
        required: true,
        validate: validators.emailValidator
    },
    date_joined: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 