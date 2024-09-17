const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  const image = req.file ? req.file.path : null; // Handle image upload

  try {
    const product = await Product.create({ name, quantity, price, image });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete an existing product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a list of all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  const image = req.file ? req.file.path : null; // Handle image upload

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, quantity, price, image }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
