const Item = require('../models/ItemSchema');
const ItemService = require('../services/ItemService');

const sortingArray = [
  { filter: { howManySold: -1 } },
  { filter: { createdAt: -1 } },
  { filter: { price: 1 } },
  { filter: { price: -1 } },
];

// Create a new item
async function createItem(req, res) {
  try {
    const { type, name, price } = req.body;
    // Generate the item ID using the ItemService
    const id = await ItemService.generateItemId(type);
    // Create the item
    const item = new Item({ type, name, price, id });
    // Save the item to the database
    await item.save();
    res.status(200).json({ message: 'Item created successfully', item });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get all items
async function getAllItems(req, res) {
  let sortBy = {};
  let filterBy = {};
  let filter = {};
  try {
    for (let filterName in req.query) {
      // filterName is: color, material, type ...
      if (filterName === 'search') {
        Object.assign(filterBy, filterBy, { name: new RegExp('.*' + req.query.search + '.*') });
        continue;
      }

      let filterComponents = [];
      filterComponents = req.query[filterName].split(',');
      // for example: filterComponents = ["black", "blue"]

      // creating a dictionary containing all the filters like: { color: { '$all': [ 'silver', 'white' ] } }
      filter = { [filterName]: { $all: filterComponents } };
      // without $all, we will only get the items that have exactly these colors and does not have more

      if (filterName !== 'sort') {
        Object.assign(filterBy, filterBy, filter);
      }
    }
    if (req.query.sort != null) {
      sortBy = sortingArray[req.query.sort].filter;
    }
    const items = await Item.find(filterBy).sort(sortBy);
    res.status(200).json(items);
  } catch (error) {
    console.error('Error getting all items:', error);
    res.status(500).json({ error: error.message });
  }
}

// Update an item by ID
async function updateItem(req, res) {
  try {
    const itemId = req.params.itemId;
    const updatedItem = req.body;
    const item = await ItemService.updateItem(itemId, updatedItem);
    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: error.message });
  }
}

// Delete an item by ID
async function deleteItem(req, res) {
  try {
    const itemId = req.params.id;
    await ItemService.deleteItem(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get an item by ID
async function getItemById(req, res) {
  try {
    const itemId = req.params.itemId;
    const item = await ItemService.getItemById(itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error getting item by ID:', error);
    res.status(500).json({ error: error.message });
  }
}

// Search items by name
async function searchItemsByName(req, res) {
  try {
    const searchQuery = req.query.search;
    const items = await ItemService.searchItemsByName(searchQuery);
    res.json(items);
  } catch (error) {
    console.error('Error searching items by name:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  searchItemsByName,
};
