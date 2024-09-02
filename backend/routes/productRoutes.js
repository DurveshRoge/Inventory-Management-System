const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addProduct, deleteProduct, getProducts } = require('../controllers/productController');

// Apply authMiddleware to protect these routes
router.post('/add', authMiddleware, addProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/', authMiddleware, getProducts);

module.exports = router;
