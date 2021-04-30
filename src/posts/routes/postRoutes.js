const express = require("express");
const controllers = require("../controllers/postControllers")

const router = express.Router();

// Get all post
router.get('/', controllers.list);
// Get a post by id
router.get('/:postId', controllers.detail);
// Delete a post
router.get('/delete/:id')


//Likes
// Get post likes
router.get('/:postId/likes', ()=>{})
// add or remove like
router.post('/:postId/like', ()=>{})

//Replies
// Get post reply
router.get('/:postId/replies', ()=>{})
// Reply a pose
router.post('/:postId/replies', ()=>{})
// Get a reply
router.get('/:postId/replies/:replyId', ()=>{})
// delete reply
router.get('/:postId/replies/:replyId/delete', ()=>{})

module.exports = router;