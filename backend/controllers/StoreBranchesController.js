const StoreBranchesService = require('../services/StoreBranchService');

// Get all Store's branches
async function getAllStoreBranches(req, res) {
  try {
    const branches = await StoreBranchesService.getAllStoreBranches();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Create a new store branch
async function createStoreBranch(req, res) {
  const branchData = req.body;
  try {
    const newBranch = await StoreBranchesService.createStoreBranch(branchData);
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  

// Update a store branch by ID
async function updateStoreBranch(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedBranch = await StoreBranchesService.updateStoreBranch(id, updateData);
    res.json(updatedBranch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  

// Delete a store branch by ID
async function deleteStoreBranch(req, res) {
  const { id } = req.params;
  try {
    const message = await StoreBranchesService.deleteStoreBranch(id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  

// Get a store branch by ID
async function getStoreBranchById(req, res) {
  const { id } = req.params;
  try {
    const branch = await StoreBranchesService.getStoreBranchById(id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ error: 'Store branch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Search store branches by filter
async function searchStoreBranches(req, res) {
  const { filter } = req.params;
  try {
    const branches = await StoreBranchesService.searchStoreBranches(filter);
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

  

module.exports = {
    getAllStoreBranches,
    createStoreBranch,
    deleteStoreBranch,
    updateStoreBranch,
    searchStoreBranches,
    getStoreBranchById
};