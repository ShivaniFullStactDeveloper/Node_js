/**
 * AUTH MIDDLEWARE
 * ----------------
 * This middleware verifies JWT token
 * and allows access to protected routes
 */

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    /* ---------------------------------------------
       1️⃣ READ AUTH HEADER
       ---------------------------------------------
       Expected format:
       Authorization: Bearer <token>
    */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    // Split "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    /* ---------------------------------------------
       2️⃣ VERIFY TOKEN
       --------------------------------------------- */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ---------------------------------------------
       3️⃣ ATTACH USER INFO TO REQUEST
       --------------------------------------------- */
    req.user = decoded; 
    // { userId, role, iat, exp }

    /* ---------------------------------------------
       4️⃣ MOVE TO NEXT MIDDLEWARE / CONTROLLER
       --------------------------------------------- */
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
