const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');

router.get('/api/myuser', UserController.getMyUser);

module.exports = router;