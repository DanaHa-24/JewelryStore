const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Get an order by ID
router.get('/:id', OrderController.getOrderById);

// Get all orders
router.get('/', OrderController.getAllOrders);

// Create a new order
router.post('/', OrderController.createOrder);

// Update an order by order ID
router.put('/:id', OrderController.updateOrder);

// Delete an order by ID
router.delete('/:id', OrderController.deleteOrder);

// Search orders by given filter
router.post('/search/:filter', OrderController.searchOrders);

module.exports = router;
