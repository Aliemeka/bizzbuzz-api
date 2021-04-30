const { Router } = require("express");
const { register } = require("../controllers/authControllers")

const router = Router()

// Get all post
router.post('/login', ()=>{});
// Resgister new user
router.post('/register', register);
// Change password
router.get('/:id/change-password', ()=>{})
// Reset password
router.get('/reset-password', ()=>{})

module.exports = router;