const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    user = new User({
      name,
      email,
      password: hashedPassword, // Save hashed password
    });

    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User registered successfully', token, userId: user.id });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};

// Login a user
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials: email not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare hashed password

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials: incorrect password' });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });

    return res.json({ token, userId: user.id }); // Include userId in the response
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
