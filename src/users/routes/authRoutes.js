const { Router } = require("express");
const { register, login, changePassword } = require("../controllers/authControllers")
const { requireAuth } = require("../../../middlewares/authMiddleware")

const router = Router()

// Get all post
router.post('/login', login);
// Resgister new user
router.post('/register', register);
// Change password
router.post('/change-password', requireAuth, changePassword)
// Reset password
router.get('/reset-password', requireAuth, ()=>{})

module.exports = router;