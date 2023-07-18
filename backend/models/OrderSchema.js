const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  numOfItems: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  deliveryMethod: { type: String, enum: ['משלוח', 'איסוף עצמי'], required: true },
  address: { type: String },
  paymentMethod: { type: String, enum: ['אשראי', 'מזומן', 'ביט'], required: true },
  state: {
    type: String,
    enum: ['נשלח ללקוח', 'הגיע לידי הלקוח/ה', 'התקבלה', 'ממתינה', 'בתהליך עיבוד', 'נאסף ע"י הלקוח/ה', 'בוטלה'],
    default: 'התקבלה',
  },
  promoCode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Mongoose middleware to format the createdAt field before saving
orderSchema.pre('save', function (next) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} - ${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  // Update the createdAt field with the formatted date
  this.createdAt = formattedDate;
  next();
});

const Order = mongoose.model('Order', orderSchema, 'OrderSchema');

module.exports = Order;
