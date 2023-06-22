const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishListController');

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
router.get('/', WishlistController.getWishListItems);
router.get('/test',WishlistController.createWishList);
module.exports = router;