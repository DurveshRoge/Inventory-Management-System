const express = require('express');
const multer = require('multer');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/productController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust to your uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a unique timestamp to the filename
  }
});
const upload = multer({ storage: storage });

// Route to add a new product with image upload
router.post('/add', authMiddleware, upload.single('image'), addProduct);

// Route to delete a product by ID
router.delete('/:id', authMiddleware, deleteProduct);

// Route to get all products
router.get('/', authMiddleware, getProducts);

// Route to update an existing product by ID, with optional image upload
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);

module.exports = router;
