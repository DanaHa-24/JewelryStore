const { handleRegister, handleLogin } = require('../controllers/AuthController');

const express = require('express');
const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);

module.exports = router;
