const { getAllPost, getPost, createPost, deletePost, updatePost } = require('../services/postServices')
const { handleValidationErrors } = require('../../../utils/errorHandlers')

// Returns all post
module.exports.allPost = async (req, res) =>{
    try{
        const posts = await getAllPost();
        posts ? (
            res.status(200).json({ success: true, posts, length: posts.length })
        ) : (
            res.status(404).json({ success: false, message: "No post yet"})
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

// Returns post by id
module.exports.postDetail = async (req, res) =>{
    try{
        const post = await getPost(req.params.postId);
        if(!post) res.status(404).json({ success: false, message: "Post not found"});
        else res.status(200).json({ success: true, post });
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


module.exports.addPost = async (req, res) =>{
    const author = req.user.id;
    const { body } = req.body

    try{
        const post = await createPost(author, body);
        res.status(201).json({ success: true, post });
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

module.exports.editPost = async(req, res) =>{
    const { id } = req.user;
    const { postId } = req.params;
    const { body } = req.body;

    try{
        //Get target post
        const post = await getPost(postId);
        if(!post){
            return res.status(400).json({ error: "post does not exist" });
        } 

        // Verify if current user is the author of the post
        if(post.author != id){
            return res.status(403).json({ success: false, message: "Post can only be editted by author" });
        } 

        // Deletes post
        const updatedPost = await updatePost(postId, body);
        res.status(201).json({ success: true, post: updatedPost });
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

module.exports.removePost = async(req, res) =>{
    const { id } = req.user;
    const { postId } = req.params;

    try{
        //Get target post
        const post = await getPost(postId);
        if(!post){
            return res.status(400).json({ error: "post does not exist" });
        } 

        // Verify if current user is the author of the post
        if(post.author != id){
            return res.status(403).json({ success: false, message: "Post can only be deleted by author" });
        } 

        // Deletes post
        await deletePost(postId);
        res.status(200).json({ success: true, message: "Post has been deleted" });
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