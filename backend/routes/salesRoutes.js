const express = require('express');
const router = express.Router();
const { recordSale, getMonthlySales } = require('../controllers/salesController');

// Route to record a new sale
router.post('/record', recordSale);

// Route to get monthly sales data
router.get('/monthly', getMonthlySales);

module.exports = router;
