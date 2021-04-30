const { getAll, findById } = require('../services/postServices')
const { handleValidationErrors } = require('../../../utils/errorHandlers')

// Returns all post
module.exports.allPost = (req, res) =>{
    try{
        const posts = getAll();
        posts ? (
            res.status(200).json({ success: true, posts })
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
        const post = await findById(req.params.postId);
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


module.exports.addPost = (req, res) =>{
    res.status(201).json({ ...req.query })
}