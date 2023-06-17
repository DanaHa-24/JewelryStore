const Cart = require('../models/CartSchema');
const CartService = require('../services/CartService');

// Get user's shopping cart
const getMyCart = async (req, res) => {
  try {
    const cart = await CartService.getUserCart(req.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user cart' });
  }
};

module.exports = {
                    getMyCart,
                };