const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    subtitle: {
        type: String,
        minlength: 10,
        maxlength: 50
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

const Post = mongoose.model('Post', postSchema)




module.exports = Post