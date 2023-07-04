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
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
    createdAt: { type: String, default: Date.now  }
}, { versionKey: false });

// Mongoose middleware to format the createdAt field before saving
userSchema.pre('save', function (next) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} - ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    // Update the createdAt field with the formatted date
    this.createdAt = formattedDate; 
    next();
});

const User = mongoose.model('User', userSchema, 'UserSchema');

module.exports = User;
