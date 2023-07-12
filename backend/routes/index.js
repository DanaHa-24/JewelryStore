const router = require('express').Router();
const UserController = require('../controllers/UserController');

//views
router.use('/about', require('./views/about.routes'));
router.use('/login', require('./views/login.routes'));
router.use('/signup', require('./views/signup.routes'));
router.use('/cart', require('./views/cart.routes'));
router.use('/contact', require('./views/contact.routes'));
router.use('/edit', require('./views/edit.routes'));
router.use('/checkout', require('./views/checkout.routes'));
router.use('/items', require('./views/items.routes'));
router.use('/product', require('./views/product.routes'));
router.use('/profile', require('./views/profile.routes'));
router.use('/qa', require('./views/qa.routes'));
router.use('/size-guide', require('./views/sizeGuide.routes'));
router.use('/stores', require('./views/stores.routes'));
router.use('/terms', require('./views/terms.routes'));
router.use('/wishlist', require('./views/wishlist.routes'));
router.use('/exchange-return', require('./views/exchangeReturn.routes'));

//routes
router.use('/item', require('./ItemRoute'));
router.use('/map', require('./StoreBranchesRoute'));
router.use('/storeBranches', require('./StoreBranchesRoute'));
router.use('/users', require('./UserRoute'));
router.use('/config', require('./ConfigRoute'));
router.use('/auth', require('./AuthRoute'));
router.use('/api/addresses', require('../middleware/auth'), require('./AddressRoute'));
router.use('/api/wishlist', require('../middleware/auth'), require('../middleware/auth'), require('./WishListRoute'));
router.use('/cart', require('./CartRoute'));
router.use('/api/orders', require('../middleware/auth'), require('./OrderRoute'));

module.exports = router;
