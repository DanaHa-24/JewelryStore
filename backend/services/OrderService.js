const Order = require('../models/OrderSchema');

// Get user's orders
const getUserOrders = async (userId) => {
  return Order.find({ user: userId });
};

module.exports = {
                    getUserOrders,
                };