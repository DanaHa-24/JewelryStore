const mongoose = require('mongoose');

const storeBranchesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number, required: true},
    latitude: { type: Number, required: true},
    city: { type: String, required: true},
    street: { type: String, required: true}
});

const StoreBranches = mongoose.model('StoreBranches', storeBranchesSchema, 'StoreBranchesSchema');

module.exports = StoreBranches;