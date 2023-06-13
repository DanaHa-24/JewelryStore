const express = require('express');
const router = express.Router();
const branchController = require('../controllers/StoreBranchesController');


// Define the route handler for fetching store branches on Google map
router.get('/', branchController.getAllStoreBranches);

  

// Create a new branch
router.post('/', branchController.createBranch);

// Update an existing branch
router.put('/:id', branchController.updateBranch);

// Delete an existing branch
router.delete('/:id', branchController.deleteBranch);

// List all branches
router.get('/', branchController.listBranches);

// Search for branches by address
router.get('/search', branchController.searchBranches);

module.exports = router;