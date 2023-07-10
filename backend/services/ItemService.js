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
  try {
    const item = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });
    return item;
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
}

// Delete an item by ID
async function deleteItem(itemId) {
  try {
    await Item.findByIdAndDelete(itemId);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
}

// Get an item by ID
async function getItemById(itemId) {
  try {
    const item = await Item.findById(itemId);
    return item;
  } catch (error) {
    throw new Error('Failed to retrieve item by ID');
  }
}

// Search items by name
async function searchItemsByName(searchQuery) {
  try {
    const items = await Item.find({ name: { $regex: searchQuery, $options: 'i' } });
    return items;
  } catch (error) {
    console.error('Error searching items:', error);
    throw new Error('Failed to search items');
  }
}

module.exports = {
  generateItemId,
  updateItem,
  deleteItem,
  getItemById,
  searchItemsByName,
};
