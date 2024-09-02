const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const product = await Product.create({ name, quantity, price });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
