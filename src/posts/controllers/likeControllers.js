const { getPost } = require('../services/postServices');
const { createOrDeleteLike, findLikes } = require('../services/likeServices');
const { handleValidationErrors } = require('../../../utils/errorHandlers');

// Like or unlike a post
module.exports.addOrRemoveLike = async (req, res) =>{
    const { postId } = req.params;
    const { id } = req.user;

    try{
        const post = await getPost(postId);
        if(!post){
            return res.status(404).json({ success: false, error: "Post not found" })
        }
        const message = await createOrDeleteLike(postId, id);
        res.status(200).json({ success: true, message });
    }
    catch(error){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(400).json({ errors });
        }
        else{
            res.status(500).json({ error: "Error editting post"});
        }
    }
}

// Get the likes of a post
module.exports.getPostLikes = async (req, res) =>{
    const { postId } = req.params;

    try{
        const post = await getPost(postId);
        if(!post){
            return res.status(404).json({ success: false, error: "Post not found" })
        }
        const likes = await findLikes(postId);
        if(!likes){
            return res.status(404).json({ success: false, error: "Post not found" })
        }
        res.status(200).json({ success: true, likes });
    }
    catch(error){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(400).json({ errors });
        }
        else{
            res.status(500).json({ error: "Error editting post"});
        }
    }
}

