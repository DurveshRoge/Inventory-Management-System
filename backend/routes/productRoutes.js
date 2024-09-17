const express = require('express');
const multer = require('multer');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/productController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust to your uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Apply authMiddleware to protect these routes
router.post('/add', authMiddleware, upload.single('image'), addProduct); // Handle file upload
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct); // Handle file upload

module.exports = router;
