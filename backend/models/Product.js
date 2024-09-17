const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' }, // Add this line for image handling
  sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
});

module.exports = mongoose.model('Product', ProductSchema);
