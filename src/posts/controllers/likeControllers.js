const { getPost } = require('../services/postServices');
const { createOrDeleteLike } = require('../services/likeServices');
const { handleValidationErrors } = require('../../../utils/errorHandlers');

// Returns all post
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

