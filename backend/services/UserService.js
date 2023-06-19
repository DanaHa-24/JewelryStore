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

// Get user by ID
const getUserById = async (userId) => {
  return User.findById(userId);
};

// Update user details
const updateUserDetails = async (userId, userDetails) => {
  return User.findByIdAndUpdate(userId, userDetails, { new: true });
};

module.exports = {
  getUserById,
  updateUserDetails,
  updateNumOfOrders,
};