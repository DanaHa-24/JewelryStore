const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema, 'CartSchema');

module.exports = Cart;
