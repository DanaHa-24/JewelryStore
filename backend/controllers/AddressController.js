const AddressService = require('../services/AddressService');

// Get user's addresses
const getMyAddresses = async (req, res) => {
  try {
    const addresses = await AddressService.getUserAddresses(req.userId);
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user addresses' });
  }
};

module.exports = {
                    getMyAddresses,
                };