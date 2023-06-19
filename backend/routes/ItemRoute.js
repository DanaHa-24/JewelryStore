const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.get('/Item', itemController.getFullSchema);
// moved the same row to app.js and it works there, 
// something is missing in the connection of app.js and the routes

module.exports = router;