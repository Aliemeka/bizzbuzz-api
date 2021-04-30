const { getAll, findById } = require('../services/postServices')

// Returns all post
exports.list = (req, res) =>{
    try{
        const posts = getAll();
        return posts.length ? (
            res.status(200).send({ success: true, posts })
        ) : (
            res.status(404).send({ success: false, message: "No post yet"})
        );
    }
    catch(err){
        return res.status(500).send({ message: err })
    }
}

// Returns post by id
exports.detail = (req, res) =>{
    try{
        const post = findById(req.params.postId);
        if(!post) return res.status(404).send({ success: false, message: "Post not found"});
        return res.status(200).send({ success: true, post });
    }
    catch(err){
        return res.status(500).send({ message: err })
    }
}