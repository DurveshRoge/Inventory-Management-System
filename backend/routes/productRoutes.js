const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/productController');

// Apply authMiddleware to protect these routes
router.post('/add', authMiddleware, addProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id', authMiddleware, updateProduct);  // New route for updating a product

module.exports = router;
