const Item = require('../models/ItemSchema');
const itemServices = require('../services/ItemService');

const sortingArray = [
    { filter: { howManySold: -1 } },
    { filter: { createdAt: -1 } },
    { filter: { price: 1 } },
    { filter: { price: -1 } }
];

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

exports.getItems = async (req, res) => {
    let sortBy = {}
    let filterBy = {}
    
    try { 
        for(let filterName in req.query){
            let filterComponents = [];
            console.log(filterName)
            if(req.query[filterName].split(",").length == 1){
                filterComponents = req.query[filterName];
            }
            else{
                filterComponents = req.query[filterName].split(",");
            }

            if(filterName !== "sort"){
                let filter = {[filterName]: filterComponents};
                Object.assign(filterBy, filterBy, filter);
            }
        }
        if(req.query.sort != null){
            sortBy = sortingArray[req.query.sort].filter;
        }
        const items = await Item.find(filterBy).sort(sortBy);
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve schema data from Item' });
    }
};