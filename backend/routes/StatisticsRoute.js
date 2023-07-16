const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const Order = require('../models/OrderSchema');
const Item = require('../models/ItemSchema');

// Get all orders by month
router.get('/orders-gb-months/', async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: { $toDate: '$createdAt' } } },
          count: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          month: { $substr: ['$_id', 5, 2] },
          year: { $substr: ['$_id', 0, 4] },
          count: 1,
          totalSales: 1,
        },
      },
      {
        $group: {
          _id: '$year',
          months: {
            $push: {
              month: '$month',
              count: '$count',
              totalSales: '$totalSales',
            },
          },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


// Get all items by category
router.get('/items-gb-types', async (req, res) => {
  try {
    // make the group by price*howManySold
    const result = await Item.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalSales: { $sum: { $multiply: ['$price', '$howManySold'] } },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
