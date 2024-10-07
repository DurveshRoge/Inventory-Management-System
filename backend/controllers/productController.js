const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, quantity, purchasePrice, sellingPrice } = req.body;

    // Check if all required fields are provided
    if (!name || !category || !quantity || !purchasePrice || !sellingPrice) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    // Check if an image file is included
    const image = req.file ? req.file.path : null;

    // Log the incoming request data for debugging
    console.log('Add Product Request:', { name, description, category, quantity, purchasePrice, sellingPrice, image });

    // Access userId from the decoded JWT
    const userId = req.user.user.id; // Updated to access userId correctly

    // Create a new product object
    const product = new Product({
      name,
      description,
      category,
      quantity,
      purchasePrice,
      sellingPrice,
      image,
      userId // Associate the product with the user ID
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error adding product:', error.message); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to add product.', error: error.message });
  }
};

// Fetch products for a specific user
exports.getProductsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming user ID is in req.params as `userId`
    console.log(req.params); // Log params for debugging

    const products = await Product.find({ userId });
    console.log(products)

    if (!products.length) {
      return res.status(404).json({ success: false, message: 'No products found for this user.' });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching user products:', error.message); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to fetch products.', error: error.message });
  }
};


// Delete an existing product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Log the product ID for debugging
    console.log('Delete Product Request for ID:', id);

    // Delete product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error.message); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to delete product.', error: error.message });
  }
};

// Get a list of all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products.length) {
      return res.status(404).json({ success: false, message: 'No products found.' });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error.message); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to fetch products.', error: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, purchasePrice, sellingPrice, description, category } = req.body;

    // Log the update request data for debugging
    console.log('Update Product Request:', { id, name, quantity, purchasePrice, sellingPrice, description, category });

    // Check if the product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Check if an image file is included and update it
    const image = req.file ? req.file.path : existingProduct.image;

    // Update product with new values
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        category: category || existingProduct.category,
        quantity: quantity !== undefined ? quantity : existingProduct.quantity,
        purchasePrice: purchasePrice !== undefined ? purchasePrice : existingProduct.purchasePrice,
        sellingPrice: sellingPrice !== undefined ? sellingPrice : existingProduct.sellingPrice,
        image
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error.message); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to update product.', error: error.message });
  }
};
