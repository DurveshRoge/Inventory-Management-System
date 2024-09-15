const express = require('express');
const { body, validationResult } = require('express-validator'); // Import validationResult
const { register, login } = require('../controllers/authController'); // Import the controller methods
const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res, next) => {
    // Handle validation errors
    const errors = validationResult(req); // Now validationResult is defined
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Call the controller method
    try {
      await register(req, res);
    } catch (error) {
      next(error); // Pass errors to error handling middleware
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req, res, next) => {
    // Handle validation errors
    const errors = validationResult(req); // Now validationResult is defined
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Call the controller method
    try {
      await login(req, res);
    } catch (error) {
      next(error); // Pass errors to error handling middleware
    }
  }
);

module.exports = router;
