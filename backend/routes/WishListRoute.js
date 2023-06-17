const express = require('express');
const router = express.Router();
const WishlistController = require('./controllers/WishListController');

router.get('/api/mywishlist', WishlistController.getMyWishlist);

module.exports = router;