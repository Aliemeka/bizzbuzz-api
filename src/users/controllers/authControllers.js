const express = require("express");
const controllers = require("../controllers/postControllers")

const router = express.Router();

// Get all post
router.post('/login', ()=>{});
// Get a post by id
router.post('/register', ()=>{});
// Delete a post
router.get('/:id/change-password', ()=>{})
// Reset password
router.get('/reset-password', ()=>{})

module.exports = router;