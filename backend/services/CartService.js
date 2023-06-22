const Cart = require('../models/CartSchema');

// Create a cart for the user or retrieve the existing cart
async function createCart(userId) {
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({ user: userId });
        await cart.save();
      }
  
      return cart;
    } catch (error) {
      console.error('Error creating/retrieving cart:', error);
      throw new Error('Failed to create/retrieve cart');
    }
}
  
// Delete the cart for the user
async function deleteCart(userId) {
    try {
      await Cart.deleteOne({ user: userId });
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw new Error('Failed to delete cart');
    }
}
  
// Add an item to the cart
async function addToCart(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      const newItem = { product: productId, quantity };
      cart.items.push(newItem);
      await cart.save();
  
      return cart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw new Error('Failed to add item to cart');
    }
}
  
// Delete an item from the cart
async function deleteFromCart(userId, itemId) {
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      cart.items = cart.items.filter((item) => item._id !== itemId);
      await cart.save();
  
      return cart;
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      throw new Error('Failed to delete item from cart');
    }
}
  
// Get all items in the cart
async function getCartItems(userId) {
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      return cart.items;
    } catch (error) {
      console.error('Error getting cart items:', error);
      throw new Error('Failed to get cart items');
    }
}
  
// Search for items in the cart by name
async function searchCartItems(userId, itemName) {
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      const items = cart.items.filter((item) => item.product.name.toLowerCase().includes(itemName.toLowerCase()));
      return items;
    } catch (error) {
      console.error('Error searching cart items:', error);
      throw new Error('Failed to search cart items');
    }
}
  
module.exports = {
                    createCart,
                    deleteCart,
                    addToCart,
                    deleteFromCart,
                    getCartItems,
                    searchCartItems,
                };