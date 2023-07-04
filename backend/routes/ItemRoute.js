const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

// Get an item by ID
router.get('/:itemId', ItemController.getItemById);

// Search items by name
router.get('/search', ItemController.searchItemsByName);

// Get all items
router.get('/', ItemController.getAllItems);

// Create a new item
router.post('/', ItemController.createItem);

// Update an item by ID
router.put('/:itemId', ItemController.updateItem);

// Delete an item by ID
router.delete('/:itemId', ItemController.deleteItem);

module.exports = router;