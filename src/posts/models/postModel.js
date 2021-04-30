const mongoose = require("mongoose");

const validators = require("@utils/validations");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        validate: validators.postValidator
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;