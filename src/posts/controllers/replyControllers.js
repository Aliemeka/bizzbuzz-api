const { findReplies, createReply, findReply, updateReply, deleteReply } = require('../services/replyServices');
const { getPost } = require('../services/postServices');
const { handleValidationErrors } = require('../../../utils/errorHandlers');

// Returns all post
module.exports.getReplies = async (req, res) =>{
    const { postId } = req.params;

    try{
        const replies = await findReplies(postId);
        replies ? (
            res.status(200).json({ success: true, replies, length: replies.length })
        ) : (
            res.status(404).json({ success: false, message: "Post has no replies"})
        );
    }
    catch(err){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(err.code).json({ errors });
        }
        else{
            res.status(500).json({ error: "Error fetching post"});
        }
    }
}

// Reply a post
module.exports.replyPost = async (req, res) =>{
    const { postId } = req.params;
    const { id } = req.user;
    const { message } = req.body;
    try{
        const post = await getPost(postId);
        if(!post) return res.status(404).json({ success: false, message: "Post not found"});
        const reply = await createReply(id, postId, message);
        res.status(201).json({ success: true, reply });
    }
    catch(err){
        const errors = handleValidationErrors(err)
        if(Object.entries(errors).length){
            res.status(err.code).json({ errors })
        }
        else{
            res.status(500).json({ error: "Error fetching post"})
        }
    }
}


module.exports.getReply = async (req, res) =>{
    const { postId, replyId } = req.params;
    try{
        const post = await getPost(postId);
        if(!post) return res.status(404).json({ success: false, message: "Post not found"});
        const reply = await findReply(replyId);
        res.status(200).json({ success: true, reply });
    }
    catch(err){
        const errors = handleValidationErrors(err)
        if(Object.entries(errors).length){
            res.status(err.code).json({ errors })
        }
        else{
            res.status(500).json({ error: "Error fetching post"})
        }
    }
}


module.exports.editReply = async(req, res) =>{
    const { id } = req.user;
    const { postId, replyId } = req.params;
    const { message } = req.body;

    try{
        //Get target post
        const post = await getPost(postId);
        if(!post){
            return res.status(400).json({ error: "post does not exist" });
        } 

        const reply = await findReply(replyId);
        // Verify if current user is the author of the post
        if(reply.author._id != id){
            return res.status(403).json({ success: false, message: "Post can only be editted by author" });
        } 

        // Deletes post
        const updatedReply = await updateReply(postId, body);
        res.status(201).json({ success: true, reply: updatedReply });
    }
    catch(err){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(400).json({ errors });
        }
        else{
            res.status(500).json({ error: "Error editting post"});
        }
    }
}


// Delete reply from post
module.exports.removeReply = async(req, res) =>{
    const { id } = req.user;
    const { postId, replyId } = req.params;

    try{
        //Get target post
        const post = await getPost(postId);
        if(!post){
            return res.status(400).json({ error: "post does not exist" });
        }
        
        const reply = await findReply(replyId);

        // Verify if current user is the author of the reply
        if(reply.author._id != id){
            return res.status(403).json({ success: false, message: "Reply can only be deleted by author" });
        } 

        // Deletes reply
        await deleteReply(replyId);
        res.status(200).json({ success: true, message: "Reply has been deleted" });
    }
    catch(err){
        const errors = handleValidationErrors(err);
        if(Object.entries(errors).length){
            res.status(400).json({ errors });
        }
        else{
            res.status(500).json({ error: "Error fetching post"});
        }
    }
}