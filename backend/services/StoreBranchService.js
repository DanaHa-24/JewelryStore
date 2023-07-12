const StoreBranch = require('../models/StoreBranchesSchema');

// Get all Store's branches
async function getAllStoreBranches() {
  try {
    const branches = await StoreBranch.find();
    return branches;
  } catch (error) {
    throw new Error('Failed to fetch store branches');
  }
}

// Create a new store branch
async function createStoreBranch(branchData) {
  try {
    const branch = new StoreBranch(branchData);
    const savedBranch = await branch.save();
    delete savedBranch.__v;
    console.log(savedBranch);
    return savedBranch;
  } catch (error) {
    throw new Error('Failed to create store branch');
  }
}

// Update a store branch by ID
async function updateStoreBranch(id, updateData) {
  try {
    const updatedBranch = await StoreBranch.findByIdAndUpdate(id, updateData, { new: true });
    delete updatedBranch.__v;
    return updatedBranch;
  } catch (error) {
    throw new Error('Failed to update store branch');
  }
}

// Delete a store branch by ID
async function deleteStoreBranch(id) {
  try {
    await StoreBranch.findByIdAndDelete(id);
    return 'Store branch deleted successfully';
  } catch (error) {
    throw new Error('Failed to delete store branch');
  }
}

// Get a store branch by ID
async function getStoreBranchById(id) {
  try {
    const branch = await StoreBranch.findById(id);
    return branch;
  } catch (error) {
    throw new Error('Failed to fetch store branch');
  }
}

// Search store branches by filter
async function searchStoreBranches(filter) {
  try {
    const branches = await StoreBranch.find({ $or: [{ name: filter }, { city: filter }, { street: filter }] });
    return branches;
  } catch (error) {
    throw new Error('Failed to search store branches');
  }
}

module.exports = {
  createStoreBranch,
  updateStoreBranch,
  deleteStoreBranch,
  getAllStoreBranches,
  getStoreBranchById,
  searchStoreBranches,
};
