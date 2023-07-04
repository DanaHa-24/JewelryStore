const ConfigSchema = require('../models/ConfigSchema');
const ConfigService = require('../services/ConfigService');

// Get all configs
async function getAllConfigs(req, res) {
  try {
    const configs = await ConfigService.getAllConfigs();
    res.json(configs);
  } catch (error) {
    console.error('Error getting all configs:', error);
    res.status(500).json({ error: 'Failed to get all configs' });
  }
}

// Create a new config
async function createConfig(req, res) {
  try {
    const { apiKey, name } = req.body;
    const config = await ConfigService.createConfig(apiKey, name);
    res.json(config);
  } catch (error) {
    console.error('Error creating config:', error);
    res.status(500).json({ error: 'Failed to create config' });
  }
}

// Update a config by ID
async function updateConfig(req, res) {
  try {
    const configId = req.params.id;
    const { apiKey, name } = req.body;
    const updatedConfig = await ConfigService.updateConfig(configId, apiKey, name);
    res.json(updatedConfig);
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ error: 'Failed to update config' });
  }
}

// Delete a config by ID
async function deleteConfig(req, res) {
  try {
    const configId = req.params.id;
    await ConfigService.deleteConfig(configId);
    res.json({ message: 'Config deleted successfully' });
  } catch (error) {
    console.error('Error deleting config:', error);
    res.status(500).json({ error: 'Failed to delete config' });
  }
}

// Get a config by ID
async function getConfigById(req, res) {
  try {
    const configId = req.params.id;
    const config = await ConfigService.getConfigById(configId);
    if (config) {
      res.json(config);
    } else {
      res.status(404).json({ error: 'Config not found' });
    }
  } catch (error) {
    console.error('Error getting config by ID:', error);
    res.status(500).json({ error: 'Failed to get config' });
  }
}


// Search configs by filter
async function searchConfigs(req, res) {
  try {
    const filter = req.params.filter;
    const configs = await ConfigService.searchConfigs(filter);
    res.json(configs);
  } catch (error) {
    console.error('Error searching configs:', error);
    res.status(500).json({ error: 'Failed to search configs' });
  }
}

async function getApiKey(req, res){
  try {
    const config = await ConfigSchema.findOne({ name: 'GOOGLE_MAPS_API_KEY' });
    if (config) {
      const apiKey = config.apiKey;
      res.status(200).json({ apiKey });
    } else {
      res.status(404).json({ message: 'Google Maps API key not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving API key', error });
  }
}


// Get API key by name
async function getConfigByName(req, res) {
  try {
    const name = req.query.name;
    const apiKey = await ConfigService.getConfigByName(name);
    if (apiKey) {
      res.status(200).json({ apiKey });
    } else {
      res.status(404).json({ message: 'API key not found' });
    }
  } catch (error) {
    console.error('Error retrieving API key:', error);
    res.status(500).json({ error: 'Failed to retrieve API key' });
  }
}


module.exports = {
  getAllConfigs,
  createConfig,
  updateConfig,
  deleteConfig,
  getConfigById,
  searchConfigs,
  getConfigByName
}
