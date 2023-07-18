const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  ILS: Number,
  USD: Number,
  EUR: Number,
});

const Currency = mongoose.model('Currency', currencySchema, 'CurrencySchema');

module.exports = Currency;
