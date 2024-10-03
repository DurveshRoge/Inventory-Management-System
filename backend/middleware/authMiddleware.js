const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging
    console.log('Decoded JWT:', decoded);

    // Attach user information to the request object
    req.user = decoded; // Ensure this includes userId (make sure your token has userId)

    // Log the authenticated user for debugging
    console.log('Authenticated user:', req.user);

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message); // Log the error for debugging
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
