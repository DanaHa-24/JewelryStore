const express = require('express');
const router = express.Router();
const AddressController = require('./controllers/addressController');

router.get('/api/myaddresses', AddressController.getMyAddresses);

module.exports = router;