const ConfigSchema = require('../models/ConfigSchema');

exports.getApiKey = async (req, res) => {
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
};
