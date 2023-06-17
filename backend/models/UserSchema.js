const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    numOfOrders: { type: Number },
    myWishList: { type: mongoose.Schema.Types.ObjectId, ref: 'WishList' },
    MyCart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
    phoneNumber: { type: String, required: true },
    role: { type: String, default: 'customer', enum: ['customer', 'admin', 'supplier'] },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'UserSchema');

module.exports = User;