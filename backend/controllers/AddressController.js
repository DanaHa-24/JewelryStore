const AddressService = require('../services/AddressService');

// Get all addresses
async function getAllAddresses(req, res) {
  try {
    const userId = req.user._id;
    const addresses = await AddressService.getAllAddresses(userId);
    res.json(addresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: error.message });
  }
}

// Create a new address
async function createAddress(req, res) {
  try {
    const addressData = req.body;
    const userId = req.user._id;
    const newAddress = await AddressService.createAddress(userId, addressData);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: error.message });
  }
}

// Update an address by ID
async function updateAddress(req, res) {
  try {
    const addressId = req.params.addressId;
    const updatedData = req.body;
    const updatedAddress = await AddressService.updateAddress(addressId, updatedData);
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: error.message });
  }
}

// Delete an address by ID
async function deleteAddress(req, res) {
  try {
    const addressId = req.params.addressId;
    const deletedAddress = await AddressService.deleteAddress(addressId);
    res.json(deletedAddress);
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get an address by ID
async function getAddressById(req, res) {
  try {
    const addressId = req.params.addressId;
    const address = await AddressService.getAddressById(addressId);
    res.status(200).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Search addresses by name, city, or street
async function searchAddresses(req, res) {
  try {
    const query = req.query.q;
    const addresses = await AddressService.searchAddresses(query);
    res.json(addresses);
  } catch (error) {
    console.error('Error searching addresses:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get addresses for the authenticated user
async function getMyAddresses(req, res) {
  try {
    const userId = req.userId;
    const addresses = await AddressService.getUserAddresses(userId);
    res.json(addresses);
  } catch (error) {
    console.error('Error getting user addresses:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
  getAddressById,
  searchAddresses,
  getMyAddresses,
};
