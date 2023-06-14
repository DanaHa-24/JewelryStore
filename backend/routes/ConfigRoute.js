const express = require('express');
const configController = require('../controllers/ConfigController');

const router = express.Router();

// Define the API key endpoint
router.get('/api/config/api-key', configController.getApiKey);

module.exports = router;
