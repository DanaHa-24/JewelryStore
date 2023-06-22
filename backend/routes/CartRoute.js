const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/', CartController.getCartItems);

module.exports = router;
