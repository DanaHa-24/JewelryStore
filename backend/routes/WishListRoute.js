const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishListController');

// Get a specific wishlist by ID
router.get('/:wishlistId', WishlistController.getWishlistById);

// Search for items in the wishlist for the authenticated user (by ID)
router.get('/search', WishlistController.searchWishlistItems);

// Get all items in the wishlist for the authenticated user (by ID)
router.get('/', WishlistController.getUserWishlist);

// Create a new wishlist the authenticated user (by ID)
// router.post('/:userId', WishlistController.createWishlist);

// Delete the wishlist for the authenticated user (by ID)
// router.delete('/:userId', WishlistController.deleteWishlist);

// Remove an item from the wishlist for the authenticated user (by ID)
router.delete('/:itemId', WishlistController.removeItem);

// Update the wishlist
router.put('/:wishlistId/items', WishlistController.updateWishlist);

// Add an item to the wishlist for the authenticated user (by ID)
router.post('/:itemId', WishlistController.addItemToWishList);

module.exports = router;
