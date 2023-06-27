const User = require('../models/UserSchema');

// Get all users
async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
}


// Create a new user
async function createUser(userData) {
  try {
    // Create a new user instance
    const user = new User(userData);

    // Validate the user data
    await user.validate();

    // Save the user to the database
    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}


// Update an user by ID
async function updateUser(id, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
}


// Delete an user by ID
async function deleteUser(id) {
  try {
    await User.findByIdAndDelete(id);
    return 'User deleted successfully';
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}


// Get an user by ID
async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}


// Search users by filter
async function searchUsers(filter) {
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: 'i' } },
        { lastName: { $regex: filter, $options: 'i' } },
        { username: { $regex: filter, $options: 'i' } },
        { phoneNumber: { $regex: filter, $options: 'i' } }
      ]
    });
    return users;
  } catch (error) {
    throw new Error('Failed to search users');
  }
}


// Get user's order history by ID
async function getUserOrderHistory(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user.orderHistory;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
}


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    getUserOrderHistory
};