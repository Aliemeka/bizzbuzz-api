const { Router } = require("express");
const {
  requireAuth,
  authorizeReset,
} = require("../../../middlewares/authMiddleware");

const {
  register,
  login,
  changePassword,
  resetPassword,
  confirmPasswordReset,
} = require("../controllers/authControllers");

const router = Router();

// Get all post
router.post("/login", login);
// Resgister new user
router.post("/register", register);
// Change password
router.post("/change-password", requireAuth, changePassword);
// Reset password
router.post("/reset-password", resetPassword);
router.post("/confirm-reset", authorizeReset, confirmPasswordReset);
module.exports = router;
