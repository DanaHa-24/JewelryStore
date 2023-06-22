const StoreBranchesSchema = require('../models/StoreBranchesSchema');


// Get all Store's branches
async function getAllStoreBranches(req, res) {
  try {
    const storeBranches = await StoreBranchesSchema.find();
    res.status(200).json(storeBranches);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving store branches', error });
  }
}



// Create a new store branch
async function createStoreBranches(req, res) {
    try {
      const { address } = req.body;
      const branch = new StoreBranchesSchema({ address });
      await branch.save();
      res.json({ message: 'Branch created successfully', branch });
    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ error: 'Failed to create branch' });
    }
  }
  
  // Update an existing branch
  async function updateStoreBranches(req, res) {
    try {
      const { id } = req.params;
      const { address } = req.body;
      const branch = await StoreBranchesSchema.findByIdAndUpdate(id, { address }, { new: true });
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }
      res.json({ message: 'Branch updated successfully', branch });
    } catch (error) {
      console.error('Error updating branch:', error);
      res.status(500).json({ error: 'Failed to update branch' });
    }
  }
  
  // Delete an existing branch
  async function deleteStoreBranches(req, res) {
    try {
      const { id } = req.params;
      const branch = await StoreBranchesSchema.findByIdAndDelete(id);
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }
      res.json({ message: 'Branch deleted successfully', branch });
    } catch (error) {
      console.error('Error deleting branch:', error);
      res.status(500).json({ error: 'Failed to delete branch' });
    }
  }
  
  // List all branches
  async function listStoreBranches(req, res) {
    try {
      const branches = await StoreBranchesSchema.find().select('address');
      res.json(branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      res.status(500).json({ error: 'Failed to fetch branches' });
    }
  }
  
  // Search for branches by address
  async function searchStoreBranches(req, res) {
    try {
      const { query } = req.query;
      const branches = await StoreBranchesSchema.find({ address: { $regex: query, $options: 'i' } }).select('address');
      res.json(branches);
    } catch (error) {
      console.error('Error searching branches:', error);
      res.status(500).json({ error: 'Failed to search branches' });
    }
  }

  module.exports = {
                      getAllStoreBranches,
                      createStoreBranches,
                      deleteStoreBranches,
                      updateStoreBranches,
                      listStoreBranches,
                      searchStoreBranches
                    };