const Address = require('../models/AddressSchema');

// Get user's addresses
const getUserAddresses = async (userId) => {
  return Address.find({ user: userId });
};

module.exports = {
                    getUserAddresses,
                };