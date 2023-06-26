const Cart = require('../models/CartSchema');

// Get all items in the cart for the authenticated user (by ID)
async function getAllCartItems(cartId) {
  try {
  const cart = await Cart.findById(cartId);

  if (!cart) {
      throw new Error('Cart not found');
  }

  return cart.items;
  } catch (error) {
  console.error('Error getting cart items:', error);
  throw new Error('Failed to get cart items');
  }
}


// Create a new cart the authenticated user (by ID)
async function createCart(userId) {
  try {
      const cart = new Cart({ user: userId });
      await cart.save();
      return cart;
  } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Failed to create cart');
  }
}


// Delete the cart for the authenticated user (by ID)
async function deleteCart(userId) {
  try {
  await Cart.deleteOne({ user: userId });
  } catch (error) {
  console.error('Error deleting cart:', error);
  throw new Error('Failed to delete cart');
  }
}


// Remove an item from the cart for the authenticated user (by ID)
async function removeItem(cartId, itemId) {
  try {
    await Cart.findByIdAndUpdate(cartId, { $pull: { items: itemId } });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    throw new Error('Failed to delete item from cart');
  }
}


// Update the cart
async function updateCart(cartId, cartData) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      cartData,
      { new: true }
    );
    return updatedCart;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw new Error('Failed to update cart');
  }
}


// Get a specific cart by ID
async function getCartById(cartId) {
  try {
    const cart = await Wishlist.findById(cartId);
    return cart;
  } catch (error) {
    console.error('Error retrieving cart:', error);
    throw new Error('Failed to retrieve cart');
  }
}


// Search for items in the cart for the authenticated user (by ID)
async function searchCartItems(cartId, itemName) {
  try {
    const cart = await Cart.findById(cartId).populate({
      path: 'items',
      match: { name: { $regex: itemName, $options: 'i' } }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const items = cart.items.filter((item) =>
      item.name.toLowerCase().includes(itemName.toLowerCase())
    );

    return items;
  } catch (error) {
    console.error('Error searching cart items:', error);
    throw new Error('Failed to search cart items');
  }
}


// Add an item to the cart for the authenticated user (by ID)
async function addItem(cartId, itemId) {
  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items.push(itemId);
    await cart.save();

    return cart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw new Error('Failed to add item to cart');
  }
}


module.exports = {
    getAllCartItems,
    createCart,
    deleteCart,
    removeItem,
    updateCart,
    getCartById,
    searchCartItems,
    addItem
};