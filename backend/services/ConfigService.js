const Config = require('../models/ConfigSchema');

// Get all configs
async function getAllConfigs() {
  return Config.find();
}

// Create a new config
async function createConfig(apiKey, name) {
  return Config.create({ apiKey, name });
}

// Update a config by ID
async function updateConfig(configId, apiKey, name) {
  return Config.findByIdAndUpdate(configId, { apiKey, name }, { new: true, runValidators: true });
}

// Delete a config by ID
async function deleteConfig(configId) {
  return Config.findByIdAndDelete(configId);
}

// Get a config by ID
async function getConfigById(configId) {
  return Config.findById(configId);
}

// Search configs by filter
async function searchConfigs(filter) {
  return Config.find({ name: { $regex: filter, $options: 'i' } });
}

// Get a config by name
async function getConfigByName(name) {
  const config = await Config.findOne({ name });
  if (config) {
    return config.apiKey;
  } else {
    return null;
  }
}

module.exports = {
  getAllConfigs,
  createConfig,
  updateConfig,
  deleteConfig,
  getConfigById,
  searchConfigs,
  getConfigByName,
};
