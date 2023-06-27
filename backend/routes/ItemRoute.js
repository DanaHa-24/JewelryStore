const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

// Get an item by ID
router.get('/item/:id', ItemController.getItemById);

// Search items by name
router.get('/search', ItemController.searchItemsByName);

// Get all items
router.get('/allItems', ItemController.getAllItems);
//router.get('/', ItemController.getAllItems);

// Create a new item
router.post('/', ItemController.createItem);

// Update an item by ID
router.put('/:id', ItemController.updateItem);

// Delete an item by ID
router.delete('/:id', ItemController.deleteItem);

module.exports = router;