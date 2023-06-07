const User = require('../models/UserSchema');

async function updateNumOfOrders(user) {
  try {
    user.numOfOrders = user.orderHistory.length;
    await user.save();
  } catch (error) {
    // Handle the error appropriately
    console.error('Error updating numOfOrders:', error);
  }
}

module.exports = { 
                    updateNumOfOrders 
                };
