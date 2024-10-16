const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, quantity, purchasePrice, sellingPrice } = req.body;

    if (!name || !category || !quantity || !purchasePrice || !sellingPrice) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    const image = req.file ? req.file.path : null;
    const userId = req.user.user.id;

    console.log('Add Product Request:', { name, description, category, quantity, purchasePrice, sellingPrice, image });

    const product = new Product({
      name,
      description,
      category,
      quantity,
      purchasePrice,
      sellingPrice,
      image,
      userId
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to add product.', error: error.message });
  }
};

exports.getProductsForUser = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const products = await Product.find({ userId });

    if (!products.length) {
      return res.status(404).json({ success: false, message: 'No products found for this user.' });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products.', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Delete Product Request for ID:', id);

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product.', error: error.message });
  }
};

exports.sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantitySold } = req.body;

    console.log('Sell Product Request:', { id, quantitySold });

    if (!id || !quantitySold || isNaN(quantitySold) || quantitySold <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid request. Product ID and a positive quantity sold are required.' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    if (product.quantity < quantitySold) {
      return res.status(400).json({ success: false, message: 'Not enough quantity available.' });
    }

    const saleAmount = product.sellingPrice * quantitySold;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $inc: { 
          quantity: -quantitySold,
          totalSales: saleAmount
        }
      },
      { new: true, runValidators: true }
    );

    console.log('Product updated successfully:', updatedProduct);

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error selling product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to sell product.', 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products.length) {
      return res.status(404).json({ success: false, message: 'No products found.' });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products.', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, purchasePrice, sellingPrice, description, category } = req.body;

    console.log('Update Product Request:', { id, name, quantity, purchasePrice, sellingPrice, description, category });

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const image = req.file ? req.file.path : existingProduct.image;

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
      { new: true, runValidators: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product.', error: error.message });
  }
};