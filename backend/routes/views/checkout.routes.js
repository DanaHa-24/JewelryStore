const path = require('path');
const router = require('express').Router();

router.get('/end/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/views/pages/endPurchasePage.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/views/pages/orderPage.html'));
});

module.exports = router;
