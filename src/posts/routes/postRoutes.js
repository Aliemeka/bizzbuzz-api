const express = require("express");
const postControllers = require("../controllers/postControllers");
const likeControllers = require("../controllers/likeControllers");
const replyControllers = require("../controllers/replyControllers");
const { requireAuth } = require("../../../middlewares/authMiddleware");

const router = express.Router();

// Get all post
router.get('/', postControllers.allPost);
// Add all post
router.post('/', requireAuth, postControllers.addPost);
// Get a post by id
router.get('/:postId', requireAuth, postControllers.postDetail);
//Edit a post
router.put('/:postId', requireAuth, postControllers.editPost);
// Delete a post
router.delete('/:postId', requireAuth, postControllers.removePost);


//Likes
// Get post likes
router.get('/:postId/likes', requireAuth, likeControllers.getPostLikes);
// add or remove like
router.get('/:postId/like', requireAuth, likeControllers.addOrRemoveLike);

//Replies
// Get post reply
router.get('/:postId/replies', requireAuth, replyControllers.getReplies);
// Reply a post
router.post('/:postId/replies', requireAuth, replyControllers.replyPost);
// Get a reply
router.get('/:postId/replies/:replyId', requireAuth, replyControllers.getReply);
// Edit a reply
router.put('/:postId/replies/:replyId', requireAuth, replyControllers.editReply);
// delete reply
router.delete('/:postId/replies/:replyId', requireAuth, replyControllers.removeReply);

module.exports = router;