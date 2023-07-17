const path = require('path');
const router = require('express').Router();

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pages/about.html'));
});

router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/adminPage.html'));
});

router.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/cartPage.html'));
});

router.get('/end/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/endPurchasePage.html'));
});

router.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/orderPage.html'));
});

router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/contactPage.html'));
});

router.get('/exchange-return', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/ExchangeReturnPage.html'));
});

router.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/itemsPage.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/loginPage.html'));
});

router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/productPage.html'));
});

router.get('/statistics', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/statisticsPage.html'));
});

router.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/profilePage.html'));
});

router.get('/qa', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/qaPage.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/signup.html'));
});

router.get('/size-guide', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/sizeGuidePage.html'));
});

router.get('/stores', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/storesPage.html'));
});

router.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/termsPage.html'));
});

router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/userPage.html'));
});

router.get('/wishlist', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/pages/wishlistPage.html'));
});

module.exports = router;
