const WishlistService = require('../services/WishListService');

// Get all items in the wish list for the authenticated user (by ID)
async function getAllWishlistItems(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const items = await WishlistService.getItems(userId);
      res.json(items);
    } catch (error) {
      console.error('Error getting wish list items:', error);
      res.status(500).json({ error: 'Failed to get wish list items' });
    }
}


// Create a new wishlist the authenticated user (by ID)
async function createWishlist(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const wishList = await WishlistService.createWishlist(userId);
      res.json(wishList);
    } catch (error) {
      console.error('Error creating wish list:', error);
      res.status(500).json({ error: 'Failed to create wish list' });
    }
}
  

// Delete the wish list for the authenticated user (by ID)
async function deleteWishlist(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      await WishlistService.deleteWishList(userId);
      res.json({ message: 'Wish list deleted successfully' });
    } catch (error) {
      console.error('Error deleting wish list:', error);
      res.status(500).json({ error: 'Failed to delete wish list' });
    }
}
  

// Remove an item from the wish list for the authenticated user (by ID)
async function removeItem(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const wishlistId = req.params.wishlistId;
      const itemId = req.params.itemId;
  
      if (!itemId) {
        res.status(400).json({ error: 'Missing item ID' });
        return;
      }
  
      const wishList = await WishlistService.removeItem(wishlistId, itemId);
      res.json(wishList);
    } catch (error) {
      console.error('Error removing item from wish list:', error);
      res.status(500).json({ error: 'Failed to remove item from wish list' });
    }
}


// Update the wishlist
async function updateWishlist(req, res) {
    try {
      const wishlistId = req.params.wishlistId;
      const wishlistData = req.body;
  
      const updatedWishlist = await WishlistService.updateWishlist(wishlistId, wishlistData);
      res.json(updatedWishlist);
    } catch (error) {
      console.error('Error updating wishlist:', error);
      res.status(500).json({ error: 'Failed to update wishlist' });
    }
}
  

// Get a specific wishlist by ID
async function getWishlistById(req, res) {
    try {
      const wishlistId = req.params.wishlistId;
  
      const wishlist = await WishlistService.getWishlistById(wishlistId);
      res.json(wishlist);
    } catch (error) {
      console.error('Error retrieving wishlist:', error);
      res.status(500).json({ error: 'Failed to retrieve wishlist' });
    }
}
  

// Search for items in the wish list for the authenticated user (by ID)
async function searchWishlistItems(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const itemName = req.query.name;
  
      if (!itemName) {
        res.status(400).json({ error: 'Missing item name' });
        return;
      }
  
      const items = await WishlistService.searchItems(userId, itemName);
      res.json(items);
    } catch (error) {
      console.error('Error searching wish list items:', error);
      res.status(500).json({ error: 'Failed to search wish list items' });
    }
}


// Add an item to the wish list for the authenticated user (by ID)
async function addItem(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const wishlistId = req.params.wishlistId;
      const itemId = req.params.itemId;
  
      if (!itemId) {
        res.status(400).json({ error: 'Missing item ID' });
        return;
      }
  
      const wishList = await WishlistService.addItem(wishlistId, itemId);
      res.json(wishList);
    } catch (error) {
      console.error('Error adding item to wish list:', error);
      res.status(500).json({ error: 'Failed to add item to wish list' });
    }
}


module.exports = {
    getAllWishlistItems,
    createWishlist,
    deleteWishlist,
    removeItem,
    updateWishlist,
    getWishlistById,
    searchWishlistItems,
    addItem
};
                