const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true,
                localField: 'orderItems.itemId',
                foreignField: 'id'
            },
            quantity: { type: Number, required: true }
        }
    ],
    createdAt: { type: String, default: Date.now  }
});

// Mongoose middleware to format the createdAt field before saving
cartSchema.pre('save', function (next) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} - ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    
    // Update the createdAt field with the formatted date
    this.createdAt = formattedDate; 
    next();
});

const Cart = mongoose.model('Cart', cartSchema, 'CartSchema');

module.exports = Cart;
