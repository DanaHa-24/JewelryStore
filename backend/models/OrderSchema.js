const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true},
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, required: true },
        },
    ],
    numOfItems: { type: Number, required: true},
    totalPrice: { type: Number, required: true },
    deliveryMethod: { type: String, enum: ['shipping', 'pickup']},
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    paymentMethod: { type: String, required: true },
    state: { type: String, enum: ['sent to costumer', 'delivered to costumer', 'accepted', 'pending', 'in progress', 'collected by costumer', 'canceled']},
    promoCode: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;


