const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/views/pages/signup.html'));
});

module.exports = router;
