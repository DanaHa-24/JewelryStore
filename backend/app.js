// Import required modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
require('dotenv').config({ path: __dirname + '/.env' });
const monogoConnect = require('./config/mongoConnect');

const server = http.createServer(app);
require('./socket').init(server);
// Connect to MongoDB Atlas
monogoConnect();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON data in request bodies
app.use(express.json());

// Parse JSON data in request bodies with a limit of 30mb
app.use(bodyParser.json({ limit: '30mb', extended: true }));

// Parse URL-encoded data in request bodies with a limit of 30mb
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));


// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend/views')));

// Serve static files from the "../frontend/images" directory
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Serve static files from the "../backend/images" directory
app.use('/backendImages', express.static(path.join(__dirname, './images')));



// Use the routes defined in the "routes" directory
app.use('/', require('./routes'));

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Default redirect => Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/homePage.html'));
});

// For other URL's => Not Found Page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/pageNotFound.html'));
});

// Open the server
server.listen(5000, () => {
  console.log('Backend server is running ');
});

module.exports = app;
