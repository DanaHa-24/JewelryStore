// maybe not neccessary
const mongoose = require('mongoose');

const earingsSchema = new mongoose.Schema({
    typePrefix: { type: Number, default: 4},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: [{ type: String }],
    style: [{ type: String, enum: ['hoop', 'falling', 'tight', 'set'] }],
    type: [{ type: String, enum: ['silver', 'pearl'] }],
    image: { type: String },
    amountInStock: { type: Number },
    status: {type: String, enum:['available', 'almost out of stock', 'out of stock']},
    createdAt: { type: Date, default: Date.now},
    id: { type: String, required: true, unique: true,
        validate: {
            validator: function (id) {
            return /^\d{5}$/.test(id);
            },
            message: 'The id must be a 5-digit number.'
        }
    },
    howManySold: { type: Number, default: 0}
});


earingsSchema.pre('save', async function (next) {
    if (!this.id) {
        const count = await this.constructor.countDocuments({});
        const newId = (count + 1).toString().padStart(4, '0').slice(-4);
        this.id = this.typePrefix + newId;
    }
    next();
});


const Earings = mongoose.model('Earings', earingsSchema);

module.exports = Earings;