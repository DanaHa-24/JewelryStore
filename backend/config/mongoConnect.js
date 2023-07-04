const mongoose = require('mongoose');

// Connect to our MongoDB Atlas
const uri = `mongodb+srv://admin:rachmany12345@cluster0.cpyytx0.mongodb.net/BU-db?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  authMechanism: 'SCRAM-SHA-1',
};

const monogoConnect = () => {
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });
};

module.exports = monogoConnect;
