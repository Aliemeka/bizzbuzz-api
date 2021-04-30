const Post = require('../models/postModel');

const getAll = () =>{
    Post.find()
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            throw err
        })
}

const findById = async (id) =>{
    return await Post.findById(id)
}

module.exports = { getAll, findById }