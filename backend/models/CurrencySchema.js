const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  ILS: Number,
  USD: Number,
  EUR: Number,
});

const Currency = mongoose.model('currency', currencySchema, 'CurrencySchema');

module.exports = Currency;
