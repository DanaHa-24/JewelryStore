const path = require('path');
const mongoose = require('mongoose');
const ConfigSchema = require(path.resolve(__dirname, '../models/ConfigSchema'));

const apiKey = 'AIzaSyAFPjN915UN-TjyyPKtfMiELLNhZYrhm7U';

mongoose.connect('mongodb://localhost:27017/BU-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Config = new ConfigSchema({ apiKey });

Config.save()
  .then(() => {
    console.log('API key saved successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('Error saving API key:', error);
    mongoose.connection.close();
  });