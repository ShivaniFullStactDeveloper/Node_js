/**
 * ADMIN AUTHORIZATION MIDDLEWARE
 * ------------------------------
 * Allows access only if role === 'admin'
 */

const adminMiddleware = (req, res, next) => {
    // req.user comes from JWT middleware
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
          message: "Admin access only ❌",
        });
      }      
  
    // User is admin → allow
    next();
  };
  
  module.exports = adminMiddleware;
  