const Cart = require('../models/CartSchema');
const CartService = require('../services/CartService');

// Create or retrieve the cart for the authenticated user
async function createOrRetrieveCart(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const cart = await CartService.createCart(userId);
      res.json(cart);
    } catch (error) {
      console.error('Error creating/retrieving cart:', error);
      res.status(500).json({ error: 'Failed to create/retrieve cart' });
    }
}
  
// Delete the cart for the authenticated user
async function deleteCart(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      await CartService.deleteCart(userId);
      res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
      console.error('Error deleting cart:', error);
      res.status(500).json({ error: 'Failed to delete cart' });
    }
}
  
// Add an item to the cart
async function addToCart(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const { productId, quantity } = req.body;
  
      if (!productId || !quantity) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
  
      const cart = await CartService.addToCart(userId, productId, quantity);
      res.json(cart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
}
  
// Delete an item from the cart
async function deleteFromCart(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const itemId = req.params.itemId;
  
      if (!itemId) {
        res.status(400).json({ error: 'Missing item ID' });
        return;
      }
  
      const cart = await CartService.deleteFromCart(userId, itemId);
      res.json(cart);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      res.status(500).json({ error: 'Failed to delete item from cart' });
    }
}
  
// Get all items in the cart
async function getCartItems(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const items = await CartService.getCartItems(userId);
      res.json(items);
    } catch (error) {
      console.error('Error getting cart items:', error);
      res.status(500).json({ error: 'Failed to get cart items' });
    }
}
  
// Search for items in the cart by name
async function searchCartItems(req, res) {
    try {
      const userId = req.userId; // Assuming the user ID is stored in the req.userId property
      const itemName = req.query.name;
  
      if (!itemName) {
        res.status(400).json({ error: 'Missing item name' });
        return;
      }
  
      const items = await CartService.searchCartItems(userId, itemName);
      res.json(items);
    } catch (error) {
      console.error('Error searching cart items:', error);
      res.status(500).json({ error: 'Failed to search cart items' });
    }
}
  
  module.exports = {
                        createOrRetrieveCart,
                        deleteCart,
                        addToCart,
                        deleteFromCart,
                        getCartItems,
                        searchCartItems,
                    };