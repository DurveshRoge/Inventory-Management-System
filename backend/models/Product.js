const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  image: { type: String, required: false } // Optional
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
