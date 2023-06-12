const mongoose = require('mongoose');

const storeBranchesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    longtitude: { type: Number, required: true},
    latitude: { type: Number, required: true}
});

const StoreBranches = mongoose.model('StoreBranches', storeBranchesSchema);

module.exports = StoreBranches;