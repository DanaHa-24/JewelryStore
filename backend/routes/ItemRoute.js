const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.get('/allItems', itemController.getItems);

module.exports = router;