const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    numOfOrders: { type: Number, default: 0 },
    myWishList: { type: mongoose.Schema.Types.ObjectId, ref: 'WishList' },
    MyCart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    phoneNumber: { type: String, required: true },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema, 'UserSchema');

module.exports = User;
