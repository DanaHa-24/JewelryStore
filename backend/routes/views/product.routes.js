const path = require('path');
const Item = require('../../models/ItemSchema');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.sendFile(path.join(__dirname, '../../../frontend/views/pages/ProductPage/productPage.html'));
});

module.exports = router;
