const express = require("express");

const router = express.Router();

router.get('/', (req, res)=>{
    res.json({
        posts: "All the post"
    });
});

router.get('/:id', (req, res)=>{
    res.json({
        post: "This is a post"
    });
});

module.exports = router;