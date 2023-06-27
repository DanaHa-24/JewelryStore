const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser")

// For testing User
const User = require('./models/UserSchema');

const itemRoutes = require('./routes/ItemRoute');
const addressRoutes = require('./routes/AddressRoute');
const cartRoutes = require ('./routes/CartRoute');
const configRoutes = require ('./routes/ConfigRoute');
const orderRoutes = require('./routes/OrderRoute');
const storeBranchesRoute = require('./routes/StoreBranchesRoute');
const userRoutes = require('./routes/UserRoute');
const wishlistRoutes = require('./routes/WishListRoute'); 
const cors = require('cors');
console.log("hello");
//const wss = new WebSocket.Server({ server: app });



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

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend/views')));
// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));



app.use('/api/mycart', cartRoutes);
app.use('/api/myorders', orderRoutes);
app.use('/api/mywishlist', wishlistRoutes);


// Remove the api
app.use('/api/item', itemRoutes);

app.use('/map', storeBranchesRoute);
app.use('/storeBranches', storeBranchesRoute);
app.use('/users', userRoutes);
app.use('/config', configRoutes);
app.use('/addresses', addressRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/homePage.html'));
});


app.listen(5000, () => {
  console.log('Backend server is running ');
 /* wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');
  
    // Handle WebSocket messages
    ws.on('message', (message) => {
      // Broadcast the received opinion to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    // Handle WebSocket disconnections
    ws.on('close', () => {
      console.log('WebSocket connection closed.');
    });
  
    // Handle WebSocket errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });*/
  
});


// Test
// app.get('/test', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while querying the database' });
//   }
// });


// For not found page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/pageNotFound.html'));
});

module.exports = app;