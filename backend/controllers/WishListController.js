const WishlistService = require('../services/WishListService');

// Get all items in the wishlist for the authenticated user (by ID)
async function getAllWishlistItems(req, res) {
  try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    const items = await WishlistService.getItems(userId);
    res.json(items);
  } catch (error) {
    console.error('Error getting wishlist items:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get User Wishlist
async function getUserWishlist(req, res) {
  try {
    const userId = req.user._id;
    const wishlist = await WishlistService.getUserWishlist(userId);
    res.send(wishlist);
  } catch (error) {
    console.error('Error getting wishlist items:', error);
    res.status(500).json({ error: error.message });
  }
}

// Create a new wishlist the authenticated user (by ID)
async function createWishlist(req, res) {
  try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    const wishList = await WishlistService.createWishlist(userId);
    res.json(wishList);
  } catch (error) {
    console.error('Error creating wishlist:', error);
    res.status(500).json({ error: error.message });
  }
}

// Delete the wishlist for the authenticated user (by ID)
async function deleteWishlist(req, res) {
  try {
    const userId = req.userId; // Assuming the user ID is stored in the req.userId property
    await WishlistService.deleteWishlist(userId);
    res.json({ message: 'Wishlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting wish list:', error);
    res.status(500).json({ error: error.message });
  }
}

// Remove an item from the wishlist for the authenticated user (by ID)
async function removeItem(req, res) {
  try {
    const userId = req.user._id; // Assuming the user ID is stored in the req.userId property
    const { itemId } = req.params;

    if (!itemId) throw new Error('Item ID is required');

    const wishList = await WishlistService.removeItem(userId, itemId);
    res.json(wishList);
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
}

// Search for items in the wishlist for the authenticated user (by ID)
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
    console.error('Error searching wishlist items:', error);
    res.status(500).json({ error: error.message });
  }
}

// Add an item to the wishlist for the authenticated user (by ID)
async function addItemToWishList(req, res) {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;
    console.log(userId, itemId);
    if (!itemId) {
      res.status(400).json({ error: 'Missing item ID' });
      return;
    }

    const wishList = await WishlistService.addItem(userId, itemId);
    res.json(wishList);
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    res.status(500).json({ error: error.message });
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
  addItemToWishList,
  getUserWishlist,
};
