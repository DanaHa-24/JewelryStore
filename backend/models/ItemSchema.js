const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (id) {
                return /^\d{5}$/.test(id);
            },
            message: 'The ID must be a 5-digit number.'
        }
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    type: { type: String, required: true, enum: ['Ring', 'Necklace', 'Bracelet', 'Earings']},
    color: [{ type: String }],
    size: [{ type: String, enum: ['S','M','L','flexible','5','6','7','8']}],
    material: [{ type: String, enum: ['beads', 'silver', 'pearl', 'stone', 'macrame']}],
    style: [{ type: String, enum: ['choker', 'falling', 'regular','tight','set','hoop']}],
    createdAt: { type: Date, default: Date.now },
    amountInStock: { type: Number },
    status: {type: String, enum:['available', 'almost out of stock', 'out of stock']},
    howManySold: { type: Number, default: 0}
});

itemSchema.pre('save', async function (next) {
    if (!this.id) {
        const ItemType = {
            Ring: '1',
            Necklace: '2',
            Bracelet: '3',
            Earings: '4'
        };

        const itemTypePrefix = ItemType[this.type];
        const lastItem = await this.constructor.findOne({ type: this.type }, 'id', { sort: { createdAt: -1 } });
        const lastId = lastItem ? parseInt(lastItem.id.slice(1)) : 0;
        const newId = (lastId + 1).toString().padStart(4, '0');
        this.id = itemTypePrefix + newId;
    }
    next();
});

const Item = mongoose.model('Item', itemSchema, 'ItemSchema');

module.exports = Item;
