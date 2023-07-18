const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/CurrencyController');

// Get all currencies from DB
router.get('/', CurrencyController.getAllCurrencies);

module.exports = router;
