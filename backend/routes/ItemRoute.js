const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

router.get('/allItems', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItemById);
router.delete('/:id', itemController.deleteItemById);

module.exports = router;
