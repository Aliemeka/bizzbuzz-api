const mongoose = require("mongoose");

const validators = require("../../../utils/validations");

const Schema = mongoose.Schema

const imageSchema = new Schema({
    caption: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    url: {
        type: String,
        required: true,
        validate: validators.urlValidator
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {  
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true });

const Image = mongooose.model('Image', imageSchema);

module.exports = Image; 