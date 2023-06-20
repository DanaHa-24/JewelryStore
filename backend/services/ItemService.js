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

module.exports = {
                    generateItemId,
                }
