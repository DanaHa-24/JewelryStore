const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true
  },
  createAt: { type: Date, default: Date.now }, 
  name: { type: String , required: true }  
});

const Config = mongoose.model('Config', configSchema, 'ConfigSchema');

module.exports = Config;