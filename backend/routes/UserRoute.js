const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Get user's order history by ID
router.get('/:userId/order-history', UserController.getUserOrderHistory);

// Get all users
router.get('/', UserController.getAllUsers);

// Create a new user
router.post('/', UserController.createUser);

// Update an user by ID
router.put('/:id', UserController.updateUser);

// Delete an user by ID
router.delete('/:id', UserController.deleteUser);

// Get an user by ID
router.get('/:id', UserController.getUserById);

// Search users by filter
router.get('/search/:filter', UserController.searchUsers);

// User logged-in
router.post('/login', UserController.login);

// User register
router.post('/register',UserController.register);

module.exports = router;