const Item = require('../models/ItemSchema');
const itemServices = require('../services/ItemService');

exports.createItem = async (req, res) => {
    try {
        const { type, name, price } = req.body;
        // Generate the item ID using the itemServices
        const id = await itemServices.generateItemId(type);
        // Create the item
        const item = new Item({ type, name, price, id });
        // Save the item to the database
        await item.save();
        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

exports.getFullSchema = async (req, res) => {
    try {
        const items = await Item.find({});
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve schema data from Item' });
    }
};



// exports.sortPriceLowToHigh = async (req, res) => {
//     try {
//       // Retrieve data from the client request
//       const { userId } = req.query; // Example: retrieving the userId from the query parameters
  
//       // Perform operations using the retrieved data
//       const items = await Item.find({ userId }); // Example: filtering items based on userId
  
//       res.json(items);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve schema data' });
//     }
// };