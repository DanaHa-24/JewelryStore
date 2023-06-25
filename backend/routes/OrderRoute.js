const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/',OrderController.getAllOrders);
router.post('/', OrderController.createOrder);
router.get('/:id',OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.post('/filter', OrderController.searchOrders);
router.delete('/:id', OrderController.deleteOrder);
router.get('/user/:username', OrderController.getAllUserOrders);

module.exports = router;