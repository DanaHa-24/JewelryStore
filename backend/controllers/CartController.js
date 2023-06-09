const CartService = require('../services/CartService');

// Get all items in the cart for the authenticated user (by ID)
async function getAllCartItems(req, res) {
  try {
    const cartId = req.params.cartId;
    const items = await CartService.getAllCartItems(cartId);
    res.json(items);
  } catch (error) {
    console.error('Error getting cart items:', error);
    res.status(500).json({ error: 'Failed to get cart items' });
  }
}


// Create a new cart the authenticated user (by ID)
async function createCart(req, res) {
  try {
    const userId = req.userId;
    const cart = await CartService.createCart(userId);
    res.json(cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
}


// Delete the cart for the authenticated user (by ID)
async function deleteCart(req, res) {
  try {
    const userId = req.userId;
    await CartService.deleteCart(userId);
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Failed to delete cart' });
  }
}


// Remove an item from the cart for the authenticated user (by ID)
async function removeItem(req, res) {
  try {
    const userId = req.userId;
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;

    if (!itemId) {
      res.status(400).json({ error: 'Missing item ID' });
      return;
    }

    const cart = await CartService.removeItem(cartId, itemId);
    res.json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
}


// Update the cart
async function updateCart(req, res) {
  try {
    const cartId = req.params.cartId;
    const cartData = req.body;

    const updatedCart = await CartService.updateCart(cartId, cartData);
    res.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
}


// Update quantity for item by it's ID at the cart by it's ID
async function updateCartItem(req, res) {
  const { cartId, itemId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCart = await CartService.updateCartItem(cartId, itemId, quantity);
    res.json(updatedCart);
    res.json({ message: 'Cart item updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
}


// Get a specific cart by ID
async function getCartById(req, res) {
  try {
    const cartId = req.params.cartId;

    const cart = await CartService.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
}


// Search for items in the cart for the authenticated user (by ID)
async function searchCartItems(req, res) {
  try {
    const userId = req.userId;
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


// Add an item to the cart for the authenticated user (by ID)
async function addItem(req, res) {
  try {
    const userId = req.userId;
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;

    if (!itemId) {
      res.status(400).json({ error: 'Missing item ID' });
      return;
    }

    const cart = await CartService.addItem(cartId, itemId);
    res.json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
}
  
module.exports = {
    getAllCartItems,
    createCart,
    deleteCart,
    removeItem,
    updateCart,
    updateCartItem,
    getCartById,
    searchCartItems,
    addItem
};