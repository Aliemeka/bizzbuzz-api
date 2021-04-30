const mongoose = require("mongoose");

const validators = require("../../utils/validations");

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: validators.titleValidator
    },
    subtitle: {
        type: String,
        validate: validators.subtitleValidator
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String
    },
    publish_date: {
        type: Date,
        default: new Date()
    }
}, { timestamps: new Date() })



const ImageSchema = new Schema({
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
}, { timestamps: new Date() });

const Post = mongoose.model('Post', postSchema);
const Image = mongooose.model('Image', ImageSchema);



module.exports = Post;