const { handleRegister, handleLogin, isAdmin } = require('../controllers/AuthController');

const express = require('express');
const router = express.Router();

// Handle register client request
router.post('/register', handleRegister);

// Handle client login
router.post('/login', handleLogin);

// Check if the user is an admin
router.get('/check', isAdmin);

module.exports = router;
