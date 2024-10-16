const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }, // Optional
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  image: { type: String, required: false }, // Optional
  totalSales: {
    type: Number,
    default: 0
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
   // Reference to User model
}, { timestamps: true }); // Automatically manage createdAt and updatedAt

module.exports = mongoose.model('Product', productSchema);
