const Branch = require('../models/StoresBranchSchema');

// Get Store's branches
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().select('address');
    res.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
};


// Create a new store branch
exports.createBranch = async (req, res) => {
    try {
      const { address } = req.body;
      const branch = new Branch({ address });
      await branch.save();
      res.json({ message: 'Branch created successfully', branch });
    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ error: 'Failed to create branch' });
    }
  };
  
  // Update an existing branch
  exports.updateBranch = async (req, res) => {
    try {
      const { id } = req.params;
      const { address } = req.body;
      const branch = await Branch.findByIdAndUpdate(id, { address }, { new: true });
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }
      res.json({ message: 'Branch updated successfully', branch });
    } catch (error) {
      console.error('Error updating branch:', error);
      res.status(500).json({ error: 'Failed to update branch' });
    }
  };
  
  // Delete an existing branch
  exports.deleteBranch = async (req, res) => {
    try {
      const { id } = req.params;
      const branch = await Branch.findByIdAndDelete(id);
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }
      res.json({ message: 'Branch deleted successfully', branch });
    } catch (error) {
      console.error('Error deleting branch:', error);
      res.status(500).json({ error: 'Failed to delete branch' });
    }
  };
  
  // List all branches
  exports.listBranches = async (req, res) => {
    try {
      const branches = await Branch.find().select('address');
      res.json(branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      res.status(500).json({ error: 'Failed to fetch branches' });
    }
  };
  
  // Search for branches by address
  exports.searchBranches = async (req, res) => {
    try {
      const { query } = req.query;
      const branches = await Branch.find({ address: { $regex: query, $options: 'i' } }).select('address');
      res.json(branches);
    } catch (error) {
      console.error('Error searching branches:', error);
      res.status(500).json({ error: 'Failed to search branches' });
    }
  };
