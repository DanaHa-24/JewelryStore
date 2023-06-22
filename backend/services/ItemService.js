const Item = require('../models/ItemSchema');

exports.generateItemId = async (type) => {
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
