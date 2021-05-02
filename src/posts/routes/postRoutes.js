const express = require("express");
const postControllers = require("../controllers/postControllers")
const { requireAuth } = require("../../../middlewares/authMiddleware")

const router = express.Router();

// Get all post
router.get('/', postControllers.allPost);
// Get all post
// router.post('/', postControllers.allPost);
// Get a post by id
router.get('/:postId', postControllers.postDetail);
// Delete a post
router.get('/delete/:postId');


//Likes
// Get post likes
router.get('/:postId/likes', ()=>{});
// add or remove like
router.post('/:postId/like', ()=>{});

//Replies
// Get post reply
router.get('/:postId/replies', ()=>{});
// Reply a post
router.post('/:postId/replies', ()=>{});
// Get a reply
router.get('/:postId/replies/:replyId', ()=>{});
// delete reply
router.get('/:postId/replies/:replyId/delete', ()=>{});

module.exports = router;