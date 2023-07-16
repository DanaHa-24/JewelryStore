const Address = require('../models/AddressSchema');
const User = require('../models/UserSchema');

// Get all addresses
async function getAllAddresses(userId) {
  try {
    const user = await User.findById(userId).populate('address');
    if (!user) throw new Error('User not found');
    return user.address;
  } catch (error) {
    console.error('Error getting addresses:', error);
    throw new Error('Failed to get addresses');
  }
}

// Create a new address
async function createAddress(userId, addressData) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const newAddress = await Address.create(addressData);
    newAddress.user = user._id;
    await newAddress.save();

    user.address.push(newAddress._id);
    await user.save();

    return newAddress;
  } catch (error) {
    console.error('Error creating address:', error);
    throw new Error('Failed to create address');
  }
}

// Delete an address by ID
async function deleteAddress(addressId) {
  try {
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      throw new Error('Address not found');
    }
    return deletedAddress;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw new Error('Failed to delete address');
  }
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
  try {
    const address = await Address.findById(addressId);
    if (!address) {
      throw new Error('Address not found');
    }
    return address;
  } catch (error) {
    throw new Error('Error fetching address by ID');
  }
}

// Search addresses by name, city, or street
async function searchAddresses(query) {
  try {
    const addresses = await Address.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { street: { $regex: query, $options: 'i' } },
      ],
    });
    return addresses;
  } catch (error) {
    console.error('Error searching addresses:', error);
    throw new Error('Failed to search addresses');
  }
}

// Get addresses for a specific user
async function getUserAddresses(userId) {
  try {
    const addresses = await Address.find({ user: userId }); // Assuming the user field in the Address model represents the user associated with the address
    return addresses;
  } catch (error) {
    console.error('Error getting user addresses:', error);
    throw new Error('Failed to get user addresses');
  }
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
