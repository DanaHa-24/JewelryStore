const Currency = require('../models/CurrencySchema.js');

// Get all currencies from DB
const getAllCurrencies = async (req, res) => {
  try {
    const result = await Currency.findOne({});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCurrencies,
};
