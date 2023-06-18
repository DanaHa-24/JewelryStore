const OrderService = require('../services/OrderService');

// Get user's order history
const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderService.getUserOrders(req.username);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user orders' });
  }
};

module.exports = {
                    getMyOrders,
                };