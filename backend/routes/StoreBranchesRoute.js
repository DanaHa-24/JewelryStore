const express = require('express');
const router = express.Router();
const branchController = require('../controllers/StoreBranchesController');


// Define the route handler for fetching store branches on Google map
router.get('/', branchController.getAllStoreBranches);

// Create a new branch
router.post('/', branchController.createStoreBranches);

// Update an existing branch
router.put('/:id', branchController.updateStoreBranches);

// Delete an existing branch
router.delete('/:id', branchController.deleteStoreBranches);

// List all branches
router.get('/', branchController.listStoreBranches);

// Search for branches by address
router.get('/search', branchController.searchStoreBranches);

module.exports = router;