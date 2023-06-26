const express = require('express');
const router = express.Router();
const StoreBranchesController = require('../controllers/StoreBranchesController');


// Define the route handler for fetching store branches on Google map
// Get all Store's branches
router.get('/', StoreBranchesController.getAllStoreBranches);

// Create a new store branch
router.post('/', StoreBranchesController.createStoreBranch);

// Update a store branch by ID
router.put('/:id', StoreBranchesController.updateStoreBranch);

// Delete a store branch by ID
router.delete('/:id', StoreBranchesController.deleteStoreBranch);

// Get a store branch by ID
router.get('/:id', StoreBranchesController.getStoreBranchById);

// Search store branches by filter
router.get('/search/:filter', StoreBranchesController.searchStoreBranches);
module.exports = router;