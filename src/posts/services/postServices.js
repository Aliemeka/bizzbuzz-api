const posts = require('../models/postModel');

const getAll = () =>{
    return posts;
}

const findById = id =>{
    const post = posts.find(post => post.id == id);
    return post;
}

module.exports = { getAll, findById }