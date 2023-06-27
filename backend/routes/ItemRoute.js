const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

router.get('/allItems', ItemController.getItems);

module.exports = router;