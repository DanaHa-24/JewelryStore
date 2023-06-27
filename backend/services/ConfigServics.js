const Config = require('../models/ConfigSchema');

// Get all configs
async function getAllConfigs() {
    try {
      return Config.find();
    } catch (error) {
      throw new Error('Failed to get all configs');
    }
}


// Create a new config
async function createConfig(apiKey, name) {
    try {
      return Config.create({ apiKey, name });
    } catch (error) {
      throw new Error('Failed to create a config');
    }
}


// Update a config by ID
async function updateConfig(configId, apiKey, name) {
    try {
      return Config.findByIdAndUpdate(
        configId,
        { apiKey, name },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error('Failed to update the config');
    }
}


// Delete a config by ID
async function deleteConfig(configId) {
    try {
      return Config.findByIdAndDelete(configId);
    } catch (error) {
      throw new Error('Failed to delete the config');
    }
}


// Get a config by ID
async function getConfigById(configId) {
    try {
      return Config.findById(configId);
    } catch (error) {
      throw new Error('Failed to get the config');
    }
}


// Search configs by filter
async function searchConfigs(filter) {
    try {
      return Config.find({ name: { $regex: filter, $options: 'i' } });
    } catch (error) {
      throw new Error('Failed to search configs');
    }
}

// Get a config by name
async function getConfigByName(name) {
    try {
      const config = await Config.findOne({ name });
      if (config) {
        return config.apiKey;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Failed to retrieve API key');
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