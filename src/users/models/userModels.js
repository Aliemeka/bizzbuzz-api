const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validators = require('../../../utils/validations');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        // required: [true, 'Username is required'],
        unique: [true, 'Username is already taken'],
        validate: validators.usernameValidator
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken'],
        lowercase: true,
        validate: validators.emailValidator
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required'],
        validate: validators.passwordValidator
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

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.statics.login = async function(login, password) {
    const isEmail = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(login);
    const user = isEmail ? await this.findOne({ email: login }) : await this.findOne({ username: login });
    if(user){
        const isAuth = await bcrypt.compare(password, user.password);
        if(isAuth) return user;
        throw Error('Incorrect password');
    }
    throw Error(`${isEmail ? 'Email' : 'Username'} is not registered`);
}


const User = mongoose.model('User', userSchema);

module.exports = User; 