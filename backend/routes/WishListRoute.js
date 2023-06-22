const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishListController');


router.get('/', WishlistController.getWishListItems);
router.get('/test',WishlistController.createWishList);
module.exports = router;