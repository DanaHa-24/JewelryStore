const express = require("express");
const app = express();
const mongoose = require("mongoose");
const branchRoutes = require('./routes/StoreBranchesRoute');
const configController = require('./controllers/ConfigController');
const cors = require('cors');

const uri = `mongodb+srv://admin:rachmany12345@cluster0.cpyytx0.mongodb.net/BU-db?retryWrites=true&w=majority`;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin', 
  authMechanism: 'SCRAM-SHA-1',
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

  app.use(cors());
  app.use(express.json());

  app.get('/api/config/api-key', configController.getApiKey);
  app.use('/api/config', require('./routes/ConfigRoute'));
  //app.use('/api/branches', branchRoutes);
  app.use('/api/storeBranches', branchRoutes);
  

app.listen(5001, () => {
    console.log('Backend server is running ');
});

module.exports = app;
