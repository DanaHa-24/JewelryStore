const Address = require('../models/AddressSchema');

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
                    searchAddresses,
                    getUserAddresses
                };



