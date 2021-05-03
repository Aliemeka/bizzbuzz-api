const Like = require("../models/likesModel");
const Post = require("../models/postModel");

module.exports.createOrDeleteLike = async(postId, userId) =>{
    try{
        const like = await Like.findOne({ post: postId, user: userId });
        if(like){
            like.delete();
            await Post.findByIdAndUpdate(postId, {$pull: { likes: like.id }});
            return "unliked";
        }
        else{
            const newLike = await Like.create({ post: postId, user: userId });
            await Post.findByIdAndUpdate(
                postId, {$push: { likes: newLike.id }}, { new: true, useFindAndModify: false }
            );
            return "liked";
        }
    }
    catch(error){
        throw error;
    }
}

module.exports.findLikes = async(postId) =>{
    try{
        return await Like.find({ post: postId });
    }
    catch(error){
        throw error;
    }
}