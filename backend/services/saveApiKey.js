const path = require('path');
const mongoose = require('mongoose');
const Config = require(path.resolve(__dirname, '../models/config'));

const apiKey = 'AIzaSyAFPjN915UN-TjyyPKtfMiELLNhZYrhm7U';

mongoose.connect('mongodb://localhost:27017/BU-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const config = new Config({ apiKey });

config.save()
  .then(() => {
    console.log('API key saved successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('Error saving API key:', error);
    mongoose.connection.close();
  });