const Item = require('../models/ItemSchema');

// Generate Id for new Item
const generateItemId = async (type) => {
  const ItemType = {
    Ring: '1',
    Necklace: '2',
    Bracelet: '3',
    Earring: '4',
  };

  const itemTypePrefix = ItemType[type];
  const lastItem = await Item.findOne({ type }, 'id', { sort: { createdAt: -1 } });
  const lastId = lastItem ? parseInt(lastItem.id.slice(1)) : 0;
  const newId = (lastId + 1).toString().padStart(4, '0');

  return itemTypePrefix + newId;
};

// Update an item by ID
async function updateItem(itemId, updatedItem) {
  const item = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });
  return item;
}

// Delete an item by ID
async function deleteItem(itemId) {
  await Item.findByIdAndDelete(itemId);
}

// Get an item by ID
async function getItemById(itemId) {
  const item = await Item.findById(itemId);
  return item;
}

// Search items by name
async function searchItemsByName(searchQuery) {
  const items = await Item.find({ name: { $regex: searchQuery, $options: 'i' } });
  return items;
}

module.exports = {
  generateItemId,
  updateItem,
  deleteItem,
  getItemById,
  searchItemsByName,
};
