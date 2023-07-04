const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  nickname: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNum: { type: Number, required: true },
  apartmentNum: { type: Number },
  postalCode: { type: Number, require: true },
});

const Address = mongoose.model('Address', addressSchema, 'AddressSchema');

module.exports = Address;
