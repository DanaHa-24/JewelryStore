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
