const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishListController');

// Get all items in the wish list for the authenticated user (by ID)
router.get('/:wishlistId/items', WishlistController.getAllWishlistItems);

// Create a new wishlist the authenticated user (by ID)
router.post('/:userId', WishlistController.createWishlist);

// Delete the wish list for the authenticated user (by ID)
router.delete('/:userId', WishlistController.deleteWishlist);

// Remove an item from the wish list for the authenticated user (by ID)
router.delete('/:wishlistId/items/:itemId', WishlistController.removeItem);

// Update the wishlist
router.put('/:wishlistId/items', WishlistController.updateWishlist);

// Get a specific wishlist by ID
router.get('/:wishlistId', WishlistController.getWishlistById);

// Search for items in the wish list for the authenticated user (by ID)
router.get('/search', WishlistController.searchWishlistItems);

// Add an item to the wish list for the authenticated user (by ID)
router.post('/:wishlistId/items/:itemId', WishlistController.addItem);

module.exports = router;