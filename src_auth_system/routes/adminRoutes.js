const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");             
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * GET /admin/dashboard
 * Only admin can access
 */
router.get(
  "/dashboard",
  authMiddleware,   // must be logged in
  adminMiddleware,  // must be admin
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑",
      adminId: req.user.userId,
    });
  }
);

module.exports = router;
