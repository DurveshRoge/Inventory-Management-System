// models/Sale.js
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Reference to the Product model
    required: true // Product reference must be provided
  },
  quantity: { 
    type: Number, 
    required: true // Quantity of the product sold must be provided
  },
  totalbought:{
    type:Number,
    required: true
  },
  totalsold: { 
    type: Number, 
    required: true // Total price for the quantity sold
  },
  date: { 
    type: Date, 
    default: Date.now // Defaults to the current date
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Sale', SaleSchema);
