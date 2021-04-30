const mongoose = require("mongoose");

const validators = require("../../utils/validations");

const Schema = mongoose.Schema

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        validate: validators.postValidator
    },
}, { timestamps: true })



const imageSchema = new Schema({
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

const Post = mongoose.model('Post', postSchema);
exports.Image = mongooose.model('Image', imageSchema);



module.exports = Post;