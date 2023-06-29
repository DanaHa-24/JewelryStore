// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser")
const cors = require('cors');

// Import routes
const itemRoutes = require('./routes/ItemRoute');
const addressRoutes = require('./routes/AddressRoute');
const cartRoutes = require ('./routes/CartRoute');
const configRoutes = require ('./routes/ConfigRoute');
const orderRoutes = require('./routes/OrderRoute');
const storeBranchesRoute = require('./routes/StoreBranchesRoute');
const userRoutes = require('./routes/UserRoute');
const wishlistRoutes = require('./routes/WishListRoute'); 


console.log("hello");





// Connect to our MongoDB Atlas
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


// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON data in request bodies
app.use(express.json());

// Parse JSON data in request bodies with a limit of 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Parse URL-encoded data in request bodies with a limit of 30mb
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend/views')));

// Serve static files from the "../frontend/images" directory
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Serve static files from the "../backend/images" directory
app.use('/backendImages', express.static(path.join(__dirname, './images')));


app.use('/map', storeBranchesRoute);
app.use('/storeBranches', storeBranchesRoute);
app.use('/users', userRoutes);
app.use('/config', configRoutes);
app.use('/addresses', addressRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/item', itemRoutes);


// Default redirect => Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/homePage.html'));
});

// For other URL's => Not Found Page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/pageNotFound.html'));
});

// Open the server
app.listen(5000, () => {
  console.log('Backend server is running ');
});

module.exports = app;