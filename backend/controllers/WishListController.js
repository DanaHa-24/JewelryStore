const WishlistService = require('../services/WishListService');

// Create a wish list for the authenticated user
async function createWishList(req, res) {
    try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    const wishList = await WishListService.createWishList(userId);
    res.json(wishList);
    } catch (error) {
    console.error('Error creating wish list:', error);
    res.status(500).json({ error: 'Failed to create wish list' });
    }
}

// Delete the wish list for the authenticated user
async function deleteWishList(req, res) {
    try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    await WishListService.deleteWishList(userId);
    res.json({ message: 'Wish list deleted successfully' });
    } catch (error) {
    console.error('Error deleting wish list:', error);
    res.status(500).json({ error: 'Failed to delete wish list' });
    }
}

// Add an item to the wish list for the authenticated user
async function addToWishList(req, res) {
    try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    const itemId = req.body.itemId;

    if (!itemId) {
        res.status(400).json({ error: 'Missing item ID' });
        return;
    }

    const wishList = await WishListService.addToWishList(userId, itemId);
    res.json(wishList);
    } catch (error) {
    console.error('Error adding item to wish list:', error);
    res.status(500).json({ error: 'Failed to add item to wish list' });
    }
}

// Remove an item from the wish list for the authenticated user
async function removeFromWishList(req, res) {
    try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    const itemId = req.params.itemId;

    if (!itemId) {
        res.status(400).json({ error: 'Missing item ID' });
        return;
    }

    const wishList = await WishListService.removeFromWishList(userId, itemId);
    res.json(wishList);
    } catch (error) {
    console.error('Error removing item from wish list:', error);
    res.status(500).json({ error: 'Failed to remove item from wish list' });
    }
}

// Get all items in the wish list for the authenticated user
async function getWishListItems(req, res) {
    try {
    const userId = req.userId;
    const items = await WishListService.getWishListItems(userId);
    res.json(items);
    } catch (error) {
    console.error('Error getting wish list items:', error);
    res.status(500).json({ error: 'Failed to get wish list items' });
    }
}

// Search for items in the wish list for the authenticated user
async function searchWishListItems(req, res) {
    try {
    const userId = req.userId; 
    const itemName = req.query.name;

    if (!itemName) {
        res.status(400).json({ error: 'Missing item name' });
        return;
    }

    const items = await WishListService.searchWishListItems(userId, itemName);
    res.json(items);
    } catch (error) {
    console.error('Error searching wish list items:', error);
    res.status(500).json({ error: 'Failed to search wish list items' });
    }
}

module.exports = {
                    createWishList,
                    deleteWishList,
                    addToWishList,
                    removeFromWishList,
                    getWishListItems,
                    searchWishListItems,
                };
                