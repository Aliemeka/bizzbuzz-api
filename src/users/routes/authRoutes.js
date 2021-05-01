const { Router } = require("express");
const { register, login, changePassword, resetPassword } = require("../controllers/authControllers")
const { requireAuth } = require("../../../middlewares/authMiddleware")

const router = Router()

// Get all post
router.post('/login', login);
// Resgister new user
router.post('/register', register);
// Change password
router.post('/change-password', requireAuth, changePassword)
// Reset password
router.post('/reset-password', resetPassword)
router.post('/confirm-reset', requireAuth, ()=>{})

module.exports = router;