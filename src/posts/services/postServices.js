const Post = require('../models/postModel');

const getAllPost = async() =>{
    try{
        const posts = await Post.find({})
        return posts;
    }
    catch(error){
        throw error;
    }
}

const getPost = async (id) =>{
    return await Post.findById(id)
}

const createPost = async (author, body) =>{
    try{
        const post = await Post.create({ author, body });
        return post;
    }
    catch(error){
        throw error;
    }
}

const updatePost = async (id, body) =>{
    try{
        const post = await Post.findById(id);
        post.body = body;
        post.save();
        return post;
    }
    catch(error){
        throw error;
    }
}


const deletePost = async (id) =>{
    try{
        await Post.findByIdAndDelete(id);
    }
    catch(error){
        throw error;
    }
}

module.exports = { getAllPost, getPost, createPost, deletePost, updatePost };