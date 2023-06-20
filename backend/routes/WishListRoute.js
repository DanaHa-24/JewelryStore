const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishListController');

router.get('/', WishlistController.getMyWishlist);

module.exports = router;