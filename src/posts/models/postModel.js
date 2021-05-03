const mongoose = require("mongoose");

const validators = require("../../../utils/validations");

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
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Like"
        }
    ],
    _replies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reply" 
        }
    ]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;