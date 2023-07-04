const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

// Get all addresses
router.get('/', AddressController.getAllAddresses);
// Get an address by ID
router.get('/:id', AddressController.getAddressById);
// Search address by filter
router.get('/user/:id', AddressController.getMyAddresses);
// Search address by filter
router.get('/search/:filter', AddressController.searchAddresses);
// Create a new address
router.post('/', AddressController.createAddress);
// Update an address by ID
router.put('/:id', AddressController.updateAddress);
// Delete an address by ID
router.delete('/:id', AddressController.deleteAddress);

module.exports = router;