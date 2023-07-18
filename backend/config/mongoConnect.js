// Connect to MongoDB atlas - takes keys from env file
const mongoose = require('mongoose');

const username = process.env.USERANME;
const password = process.env.PASSWORD;
const dbName = process.env.ATLAS_DB_NAME;

// Define our DB's url
const uri = `mongodb+srv://${username}:${password}@cluster0.cpyytx0.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Configuration settings for establishing a MongoDB connection
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
