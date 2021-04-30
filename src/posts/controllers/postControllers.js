const { getAll, findById } = require('../services/postServices')

exports.list = (req, res) =>{
    const posts = getAll();
    return posts.length ? (
        res.status(200).send({ success: true, posts })
    ) : (
        res.status(404).send({ success: false, message: "No post yet"})
    );
}

exports.detail = (req, res) =>{
    const post = findById(req.params.id);
    if(!post) return res.status(404).send({ success: false, message: "Post not found"});
    return res.status(200).send({ success: true, post });
}