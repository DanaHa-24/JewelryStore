const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Get all orders 
router.get('/',OrderController.getAllOrders);

// Create a new order
router.post('/', OrderController.createOrder);

// Update an order by order ID
router.put('/:id', OrderController.updateOrder);

// Delete an order by ID
router.delete('/:id', OrderController.deleteOrder);

// Get an order by ID
router.get('/:id',OrderController.getOrderById);

// Search orders by given filter
router.post('/search/:filter', OrderController.searchOrders);

// Get all orders for a user
router.get('/user/:username', OrderController.getAllUserOrders);

module.exports = router;