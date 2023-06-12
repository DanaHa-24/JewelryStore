const mongoose = require('mongoose');

const storesBranchesSchema = new mongoose.Schema({
    description: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    num: { type: Number, required: true }
});

const StoresBranches = mongoose.model('StoresBranches', storesBranchesSchema);

module.exports = StoresBranches;