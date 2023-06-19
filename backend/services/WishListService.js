const Wishlist = require('../models/WishListSchema');

// Get user's wishlist
const getUserWishlist = async (userId) => {
  return Wishlist.findOne({ user: userId });
};

// Update user's wishlist
const updateUserWishlist = async (userId, wishlistItems) => {
  return Wishlist.findOneAndUpdate(
    { user: userId },
    { items: wishlistItems },
    { new: true, upsert: true }
  );
};

module.exports = {
                    getUserWishlist,
                    updateUserWishlist,
                };