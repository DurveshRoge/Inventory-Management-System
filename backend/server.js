const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();
//timepass
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Configure CORS to allow cross-origin requests
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Set the frontend URL in .env as FRONTEND_URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);

// Error handling middleware for any unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received. Closing MongoDB connection and shutting down server.');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0); // Exit the process gracefully
  });
});

// Define the port number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
