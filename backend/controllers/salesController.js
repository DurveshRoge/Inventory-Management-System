const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Function to record a new sale
exports.recordSale = async (req, res) => {
  const { product, quantity, total } = req.body;
  try {
    // Create a new sale entry
    const sale = await Sale.create({ product, quantity, total });

    // Update product quantity
    await Product.findByIdAndUpdate(product, {
      $inc: { quantity: -quantity }
    });

    res.status(201).json({ success: true, sale });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Function to get monthly sales data
exports.getMonthlySales = async (req, res) => {
  const { year, month } = req.query;
  try {
    // Aggregate sales data for the given month and year
    const sales = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-${month}-01T00:00:00Z`),
            $lt: new Date(`${year}-${parseInt(month) + 1}-01T00:00:00Z`),
          },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfMonth: '$date' } },
          totalSales: { $sum: '$total' },
        },
      },
    ]);

    res.json({ success: true, sales });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
