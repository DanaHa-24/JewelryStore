const express = require('express');
const router = express.Router();
const CartController = require('./controllers/CartController');

router.get('/api/mycart', CartController.getMyCart);

module.exports = router;
