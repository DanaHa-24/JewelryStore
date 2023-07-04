const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Get a specific cart by ID
router.get('/:cartId', CartController.getCartById);

// Search for items in the cart for the authenticated user (by ID)
router.get('/search', CartController.searchCartItems);

// Get all items in the cart for the authenticated user (by ID)
router.get('/:cartId/items', CartController.getAllCartItems);

// Create a new cart for the authenticated user (by ID)
router.post('/:userId', CartController.createCart);

// Delete the cart for the authenticated user (by ID)
router.delete('/:userId', CartController.deleteCart);

// Remove an item from the cart for the authenticated user (by ID)
router.delete('/:cartId/items/:itemId', CartController.removeItem);

// Update cart's item
router.put('/:cartId/items/:itemId', CartController.updateCartItem);

// Update the cart
router.put('/:cartId/items', CartController.updateCart);

// Add an item to the cart for the authenticated user (by ID)
router.get('/:cartId/items/:itemId', CartController.addItem);

module.exports = router;