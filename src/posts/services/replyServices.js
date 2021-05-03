const Reply = require("../models/replyModel");
const Post = require("../models/postModel");


module.exports.findReplies = async(postId) =>{
    try{
        return await Reply.find({ post: postId }).populate("author", "username");
    }
    catch(error){
        throw error;
    }
}

module.exports.findReply = async(replyId) =>{
    try{
        return await Reply.findById(replyId).populate("author", "username");
    }
    catch(error){
        throw error;
    }
}


module.exports.createReply = async(userId, postId, message) =>{
    try{
        const reply = await Reply.create({
            author: userId,
            post: postId,
            message
        });
        await Post.findByIdAndUpdate(
            postId, {$push: { _replies: reply._id }}, { new: true, useFindAndModify: false }
        );
        return reply.populate("author", "username");
    }
    catch(error){
        throw error;
    }
}

module.exports.updateReply = async(replyId, message) =>{
    try{
        const reply = await Reply.findById(replyId).populate("author", "username");
        reply.message = message;
        reply.save()
        return reply;
    }
    catch(error){
        throw error;
    }
}


module.exports.deleteReply = async(replyId, postId) =>{
    try{
        const deletedReply = await Reply.findByIdAndDelete(replyId);
        await Post.findByIdAndUpdate(postId, {$pull: {_replies: deletedReply._id}});
    }
    catch(error){
        throw error;
    }
}