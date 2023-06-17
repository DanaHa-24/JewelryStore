const Cart = require('../models/CartSchema');

// Get user's cart
const getUserCart = async (userId) => {
  return Cart.findOne({ user: userId });
};

// Update user's cart
const updateUserCart = async (userId, cartItems) => {
  return Cart.findOneAndUpdate(
    { user: userId },
    { items: cartItems },
    { new: true, upsert: true }
  );
};

module.exports = {
                    getUserCart,
                    updateUserCart,
                };