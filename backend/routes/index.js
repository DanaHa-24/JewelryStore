const router = require('express').Router();

//routes
router.use('/', require('./ViewRoute'));
router.use('/currency', require('./CurrencyRoute'));
router.use('/item', require('./ItemRoute'));
router.use('/map', require('./StoreBranchesRoute'));
router.use('/storeBranches', require('./StoreBranchesRoute'));
router.use('/users', require('./UserRoute'));
router.use('/auth', require('./AuthRoute'));
router.use('/api/addresses', require('../middleware/auth'), require('./AddressRoute'));
router.use('/api/wishlist', require('../middleware/auth'), require('./WishListRoute'));
router.use('/api/orders', require('../middleware/auth'), require('./OrderRoute'));
router.use('/statistics', require('./StatisticsRoute'));

module.exports = router;
