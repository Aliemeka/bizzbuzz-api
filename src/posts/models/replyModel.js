const mongoose = require("mongoose");

const validators = require("@utils/validations");

const Schema = mongoose.Schema;

const replySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    message: {
        type: String,
        required: true,
        validate: validators.replyValidator
    }
}, { timestamps: true });


const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;