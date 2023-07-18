const Wishlist = require('../models/WishListSchema');

// Get all items in the wishlist for the authenticated user (by ID)
async function getAllWishlistItems(wishlistId) {
  const wishList = await Wishlist.findById(wishlistId);

  if (!wishList) {
    throw new Error('Wishlist not found');
  }

  return wishList.items;
}

// Create a new wishlist the authenticated user (by ID)
async function createWishlist(userId) {
  const wishList = new Wishlist({ user: userId });
  await wishList.save();
  return wishList;
}

// Delete the wishlist for the authenticated user (by ID)
async function deleteWishlist(userId) {
  await Wishlist.deleteOne({ user: userId });
}

// Remove an item from the wishlist for the authenticated user (by ID)
async function removeItem(userId, itemId) {
  const wishList = await Wishlist.findOne({ user: userId });
  wishList.items.pull(itemId);
  await wishList.save();
  return wishList;
}

// Update the wishlist
async function updateWishlist(wishlistId, wishlistData) {
  const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlistId, wishlistData, { new: true });
  return updatedWishlist;
}

// Get a specific wishlist by ID
async function getWishlistById(wishlistId) {
  const wishlist = await Wishlist.findById(wishlistId);
  return wishlist;
}

// Search for items in the wishlist for the authenticated user (by ID)
async function searchWishlistItems(wishlistId, itemName) {
  const wishlist = await Wishlist.findById(wishlistId).populate({
    path: 'items',
    match: { name: { $regex: itemName, $options: 'i' } },
  });

  if (!wishlist) {
    throw new Error('Wishlist not found');
  }

  const items = wishlist.items.filter((item) => item.name.toLowerCase().includes(itemName.toLowerCase()));

  return items;
}

// Add an item to the wishlist for the authenticated user (by ID)
async function addItem(userId, itemId) {
  const wishList = await Wishlist.findOne({ user: userId });

  if (!wishList) throw new Error('Wishlist not found');

  // Check if item already exists in wishlist
  if (wishList.items.includes(itemId)) {
    throw new Error('Item already exists in wishlist');
  }

  wishList.items.push(itemId);
  await wishList.save();

  return wishList;
}

// Get user wishlist
async function getUserWishlist(userId) {
  const wishList = await Wishlist.findOne({ user: userId }).populate('items');
  return wishList;
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
