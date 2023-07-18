const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/StatisticsController');

// Get all orders by month
router.get('/orders-gb-months', StatisticsController.groupByOrdersByMonths);

// Get all items by category
router.get('/items-gb-types', StatisticsController.groupByItemsByTypes);

module.exports = router;
