const StoreBranch = require('../models/StoreBranchesSchema');

// Get all Store's branches
async function getAllStoreBranches() {
  const branches = await StoreBranch.find();
  return branches;
}

// Create a new store branch
async function createStoreBranch(branchData) {
  const branch = new StoreBranch(branchData);
  const savedBranch = await branch.save();
  delete savedBranch.__v;
  console.log(savedBranch);
  return savedBranch;
}

// Update a store branch by ID
async function updateStoreBranch(id, updateData) {
  const updatedBranch = await StoreBranch.findByIdAndUpdate(id, updateData, { new: true });
  delete updatedBranch.__v;
  return updatedBranch;
}

// Delete a store branch by ID
async function deleteStoreBranch(id) {
  await StoreBranch.findByIdAndDelete(id);
  return 'Store branch deleted successfully';
}

// Get a store branch by ID
async function getStoreBranchById(id) {
  const branch = await StoreBranch.findById(id);
  return branch;
}

// Search store branches by filter
async function searchStoreBranches(filter) {
  const branches = await StoreBranch.find({ $or: [{ name: filter }, { city: filter }, { street: filter }] });
  return branches;
}

module.exports = {
  createStoreBranch,
  updateStoreBranch,
  deleteStoreBranch,
  getAllStoreBranches,
  getStoreBranchById,
  searchStoreBranches,
};
