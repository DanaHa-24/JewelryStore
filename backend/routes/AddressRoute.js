const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.get('/', AddressController.getMyAddresses);

module.exports = router;