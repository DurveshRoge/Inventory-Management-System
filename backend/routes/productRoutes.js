const express = require('express');
const multer = require('multer');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes
const productController = require('../controllers/productController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust to your uploads directory
  },
  filename: function (req, file, cb) {
    // Add a unique timestamp to the filename to avoid name conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Only accept image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Set up multer with storage and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
  fileFilter: fileFilter
});

// Route to add a new product with image upload
router.post('/add', authMiddleware, upload.single('image'), productController.addProduct);

// Route to delete a product by ID
router.delete('/:id', authMiddleware, productController.deleteProduct);

// Route to get all products
router.get('/', productController.getProducts); // This could be updated based on your needs

// Route to get products for the authenticated user
router.get('/products', authMiddleware, productController.getProductsForUser); // New route for fetching user's products

// Route to sell a product
router.put('/sell/:id', authMiddleware, productController.sellProduct);

// New route to get a single product by ID
router.get('/:id', authMiddleware, productController.getProductById);

// Route to update an existing product by ID, with optional image upload
router.put('/:id', authMiddleware, upload.single('image'), productController.updateProduct);

module.exports = router;