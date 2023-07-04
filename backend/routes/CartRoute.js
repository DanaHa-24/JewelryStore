const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Get all items in the cart for the authenticated user (by ID)
router.get('/:cartId/items', CartController.getAllCartItems);

// Create a new cart the authenticated user (by ID)
router.post('/:userId', CartController.createCart);

// Delete the cart for the authenticated user (by ID)
router.delete('/:userId', CartController.deleteCart);

// Remove an item from the cart for the authenticated user (by ID)
router.delete('/:cartId/items/:itemId', CartController.removeItem);

// Update the cart
router.put('/:cartId/items', CartController.updateCart);

// Get a specific cart by ID
router.get('/:cartId', CartController.getCartById);

// Search for items in the cart for the authenticated user (by ID)
router.get('/search', CartController.searchCartItems);

// Add an item to the cart for the authenticated user (by ID)
router.post('/:cartId/items/:itemId', CartController.addItem);

module.exports = router;



module.exports = router;
