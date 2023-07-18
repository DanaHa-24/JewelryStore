const Address = require('../models/AddressSchema');
const User = require('../models/UserSchema');

// Get all addresses
async function getAllAddresses(userId) {
  const user = await User.findById(userId).populate('address');
  if (!user) throw new Error('User not found');
  return user.address;
}

// Create a new address
async function createAddress(userId, addressData) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  const newAddress = await Address.create(addressData);
  newAddress.user = user._id;
  await newAddress.save();

  user.address.push(newAddress._id);
  await user.save();

  return newAddress;
}

// Delete an address by ID
async function deleteAddress(addressId) {
  const deletedAddress = await Address.findByIdAndDelete(addressId);
  if (!deletedAddress) {
    throw new Error('Address not found');
  }
  return deletedAddress;
}

// Update an address by ID
async function updateAddress(addressId, updatedData) {
  const updatedAddress = await Address.findByIdAndUpdate(addressId, updatedData, { new: true });
  if (!updatedAddress) {
    throw new Error('Address not found');
  }
  return updatedAddress;
}

// Get an address by ID
async function getAddressById(addressId) {
  const address = await Address.findById(addressId);
  if (!address) {
    throw new Error('Address not found');
  }
  return address;
}

// Search addresses by name, city, or street
async function searchAddresses(query) {
  const addresses = await Address.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { city: { $regex: query, $options: 'i' } },
      { street: { $regex: query, $options: 'i' } },
    ],
  });
  return addresses;
}

// Get addresses for a specific user
async function getUserAddresses(userId) {
  const addresses = await Address.find({ user: userId }); // Assuming the user field in the Address model represents the user associated with the address
  return addresses;
}

module.exports = {
  createAddress,
  deleteAddress,
  updateAddress,
  getAllAddresses,
  getAddressById,
  searchAddresses,
  getUserAddresses,
};
