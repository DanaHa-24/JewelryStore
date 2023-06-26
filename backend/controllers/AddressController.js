const AddressService = require('../services/AddressService');

// Get all addresses
async function getAllAddresses(req, res) {
    try {
    const addresses = await AddressService.getAllAddresses();
    res.json(addresses);
    } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Failed to get addresses' });
    }
}


// Create a new address
async function createAddress(req, res) {
    try {
    const addressData = req.body; // Assuming the address data is passed in the request body
    const newAddress = await AddressService.createAddress(addressData);
    res.status(201).json(newAddress);
    } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Failed to create address' });
    }
}


// Update an address by ID
async function updateAddress(req, res) {
    try {
    const addressId = req.params.id; // Assuming the address ID is passed in the URL parameter
    const updatedData = req.body; // Assuming the updated address data is passed in the request body
    const updatedAddress = await AddressService.updateAddress(addressId, updatedData);
    res.json(updatedAddress);
    } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
    }
}


// Delete an address by ID
async function deleteAddress(req, res) {
    try {
    const addressId = req.params.id; // Assuming the address ID is passed in the URL parameter
    const deletedAddress = await AddressService.deleteAddress(addressId);
    res.json(deletedAddress);
    } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
    }
}


// Get an address by ID
async function getAddressById(req, res) {
    try {
      const addressId = req.params.id;
      const address = await AddressService.getAddressById(addressId);
      res.status(200).json(address);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}


// Search addresses by name, city, or street
async function searchAddresses(req, res) {
    try {
    const query = req.query.q; // Assuming the search query is passed as a query parameter '?q=<search query>'
    const addresses = await AddressService.searchAddresses(query);
    res.json(addresses);
    } catch (error) {
    console.error('Error searching addresses:', error);
    res.status(500).json({ error: 'Failed to search addresses' });
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
      res.status(500).json({ error: 'Failed to get user addresses' });
    }
}

module.exports = {
                    getAllAddresses,
                    createAddress,
                    deleteAddress,
                    updateAddress,
                    getAddressById,
                    searchAddresses,
                    getMyAddresses
                };
                