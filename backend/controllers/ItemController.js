const Item = require('../models/ItemSchema');
const itemServices = require('../services/ItemService');

const sortingArray = [
    { filter: { howManySold: -1 } },
    { filter: { createdAt: -1 } },
    { filter: { price: 1 } },
    { filter: { price: -1 } }
];

// Needs to seperate to Controller and Service
// Create a new item
async function createItem(req, res) {
    try {
        const { type, name, price } = req.body;
        // Generate the item ID using the itemServices
        const id = await itemServices.generateItemId(type);
        // Create the item
        const item = new Item({ type, name, price, id });
        // Save the item to the database
        await item.save();
        res.status(200).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
}


// Needs to seperate to Controller and Service
// Get all items
async function getAllItems(req, res) {
    let sortBy = {}
    let filterBy = {}
    let filter = {}
    try {
        for(let filterName in req.query){
            if(filterName == "search"){
                Object.assign(filterBy, filterBy, {name: new RegExp(".*" + req.query.search + ".*")});
                continue;
            }
            // filterName is: color, material, type ...
            let filterComponents = [];
            filterComponents = req.query[filterName].split(",");
            // for example: filterComponents = 'black'

            filter = { [filterName]: { '$all': filterComponents } };
            
            if(filterName !== "sort"){
                Object.assign(filterBy, filterBy, filter);
            }
        }
        if(req.query.sort != null){
            sortBy = sortingArray[req.query.sort].filter;
        }
        console.log(filterBy)
        const items = await Item.find(filterBy).sort(sortBy);
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve schema data from Item' });
    }
}


// Update an item by ID
async function updateItem(req, res) {
    try {
      const itemId = req.params.id;
      const updatedItem = req.body;
      const item = await ItemService.updateItem(itemId, updatedItem);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item' });
    }
}
  

// Delete an item by ID
async function deleteItem(req, res) {
    try {
      const itemId = req.params.id;
      await ItemService.deleteItem(itemId);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' });
    }
}
  

async function getItemById(req, res) {
    try {
      const itemId = req.params.id;
      const item = await ItemService.getItemById(itemId);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error getting item by ID:', error);
      res.status(500).json({ error: 'Failed to get item' });
    }
}
  

// Search items by name
async function searchItemsByName(req, res) {
    try {
      const searchQuery = req.query.search;
      const items = await ItemService.searchItemsByName(searchQuery);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search items' });
    }
}


module.exports = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getItemById,
    searchItemsByName
};