/**
 * PROTECTED ROUTES
 * ----------------
 * These APIs require valid JWT token
 */

const express = require("express");
const authMiddleware = require("./authRoutes");

const router = express.Router();

/**
 * GET /profile
 * Protected API
 */
router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Profile accessed successfully ✅",
    user: req.user, // comes from JWT
  });
});

module.exports = router;
