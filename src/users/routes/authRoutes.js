const { Router } = require("express");

const router = Router()

// Get all post
router.post('/login', ()=>{});
// Resgister new user
router.post('/register', ()=>{});
// Change password
router.get('/:id/change-password', ()=>{})
// Reset password
router.get('/reset-password', ()=>{})

module.exports = router;