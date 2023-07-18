const User = require('../models/UserSchema');

// Get all users
async function getAllUsers() {
  const users = await User.find()
    .populate('myWishList')
    .populate('MyCart')
    .populate('orderHistory')
    .populate('address');
  return users;
}

// Create a new user
async function createUser(userData) {
  // Create a new user instance
  const user = new User(userData);
  // Validate the user data
  await user.validate();
  // Save the user to the database
  const savedUser = await user.save();
  return savedUser;
}

// Update an user by ID
async function updateUser(id, updateData) {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
  return updatedUser;
}

// Delete an user by ID
async function deleteUser(id) {
  console.log(id);
  await User.findByIdAndDelete(id);
  return 'User deleted successfully';
}

// Get an user by ID
async function getUserById(id) {
  const user = await User.findById(id)
    .populate({ path: 'myWishList', populate: { path: 'items' } })
    .populate('MyCart')
    .populate('orderHistory')
    .populate('address');
  if (!user) throw new Error('User not found');
  user.password = undefined;
  return user;
}

// Search users by filter
async function searchUsers(filter) {
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: 'i' } },
      { lastName: { $regex: filter, $options: 'i' } },
      { username: { $regex: filter, $options: 'i' } },
      { phoneNumber: { $regex: filter, $options: 'i' } },
    ],
  });
  return users;
}

// Get user's order history by ID
async function getUserOrderHistory(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user.orderHistory;
}

// Get user's addresses by ID
async function getUserAddresses(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user.address;
}

// Get user's wishlist by ID
async function getUserWishlist(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user.myWishList;
}

// Get user's cart by ID
async function getUserMyCart(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user.MyCart;
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  searchUsers,
  getUserOrderHistory,
  getUserAddresses,
  getUserWishlist,
  getUserMyCart,
};
