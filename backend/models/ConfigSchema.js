const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  apiKey: {
    type: String,
    required: true
  },
  createdAt: { type: String, default: Date.now  },
  name: { type: String , required: true }  
});

// Mongoose middleware to format the createdAt field before saving
configSchema.pre('save', function (next) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} - ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    
    // Update the createdAt field with the formatted date
    this.createdAt = formattedDate; 
    next();
});

const Config = mongoose.model('Config', configSchema, 'ConfigSchema');

module.exports = Config;