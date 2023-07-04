const itemRoutes = require('./ItemRoute');
const addressRoutes = require('./AddressRoute');
const cartRoutes = require('./CartRoute');
const configRoutes = require('./ConfigRoute');
const orderRoutes = require('./OrderRoute');
const storeBranchesRoute = require('./StoreBranchesRoute');
const userRoutes = require('./UserRoute');
const wishlistRoutes = require('./WishListRoute');
const authRoutes = require('./AuthRoute');

const router = require('express').Router();

router.use('/api/item', itemRoutes);
router.use('/map', storeBranchesRoute);
router.use('/storeBranches', storeBranchesRoute);
router.use('/users', userRoutes);
router.use('/config', configRoutes);
router.use('/auth', authRoutes);
router.use('/addresses', addressRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
