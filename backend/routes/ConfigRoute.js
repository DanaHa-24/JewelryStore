const express = require('express');
const ConfigController = require('../controllers/ConfigController');
const router = express.Router();

// Define the API key endpoint
router.get('/key', ConfigController.getConfigByName);

// Get all configs 
router.get('/',ConfigController.getAllConfigs);

// Create a new config
router.post('/', ConfigController.createConfig);

// Update an order by config ID
router.put('/:id', ConfigController.updateConfig);

// Delete an config by ID
router.delete('/:id', ConfigController.deleteConfig);

// Get an config by ID
router.get('/:id', ConfigController.getConfigById);

// Search configs by given filter
router.post('/search/:filter', ConfigController.searchConfigs);

module.exports = router;
