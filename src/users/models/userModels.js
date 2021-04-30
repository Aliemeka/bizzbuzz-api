const mongoose = require("mongoose");

const validators = require('../../../utils/validations');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: validators.nameValidator
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: validators.emailValidator
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required']
    },
    is_active: {
        type: Boolean,
        default: true
    },
    date_joined: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 