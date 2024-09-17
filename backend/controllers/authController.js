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

    // Create a new user with the hashed password
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User registered successfully', token });
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

  console.log("body",req.body)

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials email' });
    }


    console.log("user", user)


    // Check if password matches
    const isMatch = await user.checkPassword(password);

    console.log("first" , isMatch,password)
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials password' });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};
