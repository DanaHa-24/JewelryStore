const path = require('path');
const mongoose = require('mongoose');
const ConfigSchema = require(path.resolve(__dirname, '../models/ConfigSchema'));

const apiKey = 'AIzaSyAFPjN915UN-TjyyPKtfMiELLNhZYrhm7U';

mongoose.connect('mongodb+srv://admin:rachmany12345@cluster0.cpyytx0.mongodb.net/BU-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const config = new ConfigSchema({ apiKey , name: 'GOOGLE_MAPS_API_KEY'});

config.save()
  .then(() => {
    console.log('API key saved successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('Error saving API key:', error);
    mongoose.connection.close();
  });