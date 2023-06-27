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
        res.status(200).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

exports.getItems = async (req, res) => {
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
};