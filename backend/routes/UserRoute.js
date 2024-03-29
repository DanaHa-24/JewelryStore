const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Get user's cart by ID
router.get('/my-cart', UserController.getUserMyCart);

// Get user's order history by ID
router.get('/order-history', require('../middleware/auth'), UserController.getUserOrderHistory);

// Get user's addresses by ID
router.get('/my-addresses', require('../middleware/auth'), UserController.getUserAddresses);

// Get user's wishlist by ID
router.get('/my-wish', require('../middleware/auth'), UserController.getUserWishlist);

// Get all users
router.get('/', UserController.getAllUsers);

// Update an user by ID
router.put('/:userId', UserController.updateUser);

// Delete an user by ID
router.delete('/:userId', UserController.deleteUser);

// Get an user by ID
router.get('/:userId', UserController.getUserById);

// Search users by filter
router.get('/search/:filter', UserController.searchUsers);

// User logged-in
router.post('/login', UserController.login);

// User register
router.post('/register', UserController.register);

module.exports = router;
