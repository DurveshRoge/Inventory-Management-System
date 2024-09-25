const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS package

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Configure CORS to allow cross-origin requests
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Update this to your frontend's URL (e.g., 'http://localhost:3000')
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Import and define routes
const authRoutes = require('./routes/authRoutes'); // Auth routes
const productRoutes = require('./routes/productRoutes'); // Product routes
const salesRoutes = require('./routes/salesRoutes'); // Sales routes

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/sales', salesRoutes); // Sales routes

// Define the port number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
