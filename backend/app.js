const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
// const branchRoutes = require('./routes/StoreBranchesRoute');
// const itemRoutes = require('./routes/ItemRoute');
// const configController = require('./controllers/ConfigController');
// const addressRoutes = require('./routes/AddressRoute');
// const cartRoutes = require ('./routes/CartRoute');
// const orderRoutes = require('./routes/OrderRoute');
// const userRoutes = require('./routes/UserRoute');
// const wishlistRoutes = require('./routes/WishListRoute'); 
// const itemController = require('./controllers/ItemController');
const cors = require('cors');
console.log("hello");
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

  app.use(bodyParser.urlencoded({extended:true}))

  // app.use('/api/myaddresses', addressRoutes);
  // app.use('/api/mycart', cartRoutes);
  // app.use('/api/myorders', orderRoutes);
  // app.use('/api/myuser', userRoutes);
  // app.use('/api/mywishlist', wishlistRoutes);
  // app.get('/api/config/api-key', configController.getApiKey);
  // app.use('/api/config', require('./routes/ConfigRoute'));
  // app.use('/api/storeBranches', branchRoutes);
  // app.use('/Item', itemRoutes);
  // app.get('/Item', itemController.getFullSchema);


app.listen(3000, () => {
    console.log('Backend server is running ');
});

module.exports = app;