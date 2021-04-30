const Post = require('../models/postModel');

const getAll = () =>{
    Post.find()
        .then((res)=>{
            return result
        })
        .catch((err)=>{
            throw err
        })
}

const findById = id =>{
    const post = posts.find(post => post.id == id);
    return post;
}

module.exports = { getAll, findById }