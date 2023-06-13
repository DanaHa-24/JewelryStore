const mongoose = require('mongoose');

const config = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true
  },
  createAt: { type: Date, default: Date.now } 
});

const Config = mongoose.model('Config', config);

module.exports = Config;