const Address = require('../models/AddressSchema');
const mongoose = require('mongoose');

// Get all addresses
async function getAllAddresses() {
  try {
    const addresses = await Address.find();
    return addresses;
  } catch (error) {
    console.error('Error getting addresses:', error);
    throw new Error('Failed to get addresses');
  }
}

// Create a new address
async function createAddress(addressData) {
  try {
    const newAddress = await Address.create(addressData);
    return newAddress;
  } catch (error) {
    console.error('Error creating address:', error);
    throw new Error('Failed to create address');
  }
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
  try {
    const updatedAddress = await Address.findByIdAndUpdate(addressId, updatedData, { new: true });
    if (!updatedAddress) {
      throw new Error('Address not found');
    }
    return updatedAddress;
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
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
  console.log(query);
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
  const id = new mongoose.Types.ObjectId(userId);
  const addresses = await Address.find({ user: id });
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
