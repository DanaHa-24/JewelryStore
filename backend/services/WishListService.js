const Wishlist = require('../models/WishListSchema');

// Get all items in the wishlist for the authenticated user (by ID)
async function getAllWishlistItems(wishlistId) {
  try {
    const wishList = await Wishlist.findById(wishlistId);

    if (!wishList) {
      throw new Error('Wishlist not found');
    }

    return wishList.items;
  } catch (error) {
    console.error('Error getting wishlist items:', error);
    throw new Error('Failed to get wishlist items');
  }
}

// Create a new wishlist the authenticated user (by ID)
async function createWishlist(userId) {
  try {
    const wishList = new Wishlist({ user: userId });
    await wishList.save();
    return wishList;
  } catch (error) {
    console.error('Error creating wishlist:', error);
    throw new Error('Failed to create wishlist');
  }
}

// Delete the wishlist for the authenticated user (by ID)
async function deleteWishlist(userId) {
  try {
    await Wishlist.deleteOne({ user: userId });
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    throw new Error('Failed to delete wishlist');
  }
}

// Remove an item from the wishlist for the authenticated user (by ID)
async function removeItem(userId, itemId) {
  try {
    const wishList = await Wishlist.findOne({ user: userId });
    wishList.items.pull(itemId);
    await wishList.save();
    return wishList;
  } catch (error) {
    console.error('Error deleting item from wishlist:', error);
    throw new Error('Failed to delete item from wishlist');
  }
}

// Update the wishlist
async function updateWishlist(wishlistId, wishlistData) {
  try {
    const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlistId, wishlistData, { new: true });
    return updatedWishlist;
  } catch (error) {
    console.error('Error updating wishlist:', error);
    throw new Error('Failed to update wishlist');
  }
}

// Get a specific wishlist by ID
async function getWishlistById(wishlistId) {
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    return wishlist;
  } catch (error) {
    console.error('Error retrieving wishlist:', error);
    throw new Error('Failed to retrieve wishlist');
  }
}

// Search for items in the wishlist for the authenticated user (by ID)
async function searchWishlistItems(wishlistId, itemName) {
  try {
    const wishlist = await Wishlist.findById(wishlistId).populate({
      path: 'items',
      match: { name: { $regex: itemName, $options: 'i' } },
    });

    if (!wishlist) {
      throw new Error('Wishlist not found');
    }

    const items = wishlist.items.filter((item) => item.name.toLowerCase().includes(itemName.toLowerCase()));

    return items;
  } catch (error) {
    console.error('Error searching wishlist items:', error);
    throw new Error('Failed to search wishlist items');
  }
}

// Add an item to the wishlist for the authenticated user (by ID)
async function addItem(userId, itemId) {
  try {
    const wishList = await Wishlist.findOne({ user: userId });

    if (!wishList) throw new Error('Wishlist not found');

    // Check if item already exists in wishlist
    if (wishList.items.includes(itemId)) {
      throw new Error('Item already exists in wishlist');
    }

    wishList.items.push(itemId);
    await wishList.save();

    return wishList;
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    throw new Error('Failed to add item to wishlist');
  }
}

// Get user wishlist
async function getUserWishlist(userId) {
  try {
    const wishList = await Wishlist.findOne({ user: userId }).populate('items');
    return wishList;
  } catch (error) {
    console.error('Error getting wishlist:', error);
    throw new Error('Failed to get wishlist');
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
  addItem,
  getUserWishlist,
};
