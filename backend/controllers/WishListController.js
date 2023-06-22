const WishlistService = require('../services/WishListService');

// Get user's wishlist
const getMyWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.getUserWishlist(req.userId);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user wishlist' });
  }
};

module.exports = {
                    getMyWishlist,
                };