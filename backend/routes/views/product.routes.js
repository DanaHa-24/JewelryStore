const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname, '../../../frontend/views/pages/productPage.html'));
});

module.exports = router;
