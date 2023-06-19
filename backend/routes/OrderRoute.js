const express = require('express');
const router = express.Router();
const OrderController = require('./controllers/OrderController');

router.get('/api/myorders', OrderController.getMyOrders);

module.exports = router;