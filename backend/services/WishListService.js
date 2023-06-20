const Wishlist = require('../models/WishListSchema');

// Create a wish list for the user
async function createWishList(userId) {
    try {
    const wishList = new WishList({ user: userId });
    await wishList.save();
    return wishList;
    } catch (error) {
    console.error('Error creating wish list:', error);
    throw new Error('Failed to create wish list');
    }
}

// Delete the wish list for the user
async function deleteWishList(userId) {
    try {
    await WishList.deleteOne({ user: userId });
    } catch (error) {
    console.error('Error deleting wish list:', error);
    throw new Error('Failed to delete wish list');
    }
}

// Add an item to the wish list
async function addToWishList(userId, itemId) {
    try {
    const wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
        throw new Error('Wish list not found');
    }

    wishList.items.push(itemId);
    await wishList.save();

    return wishList;
    } catch (error) {
    console.error('Error adding item to wish list:', error);
    throw new Error('Failed to add item to wish list');
    }
}

// Remove an item from the wish list
async function removeFromWishList(userId, itemId) {
    try {
    const wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
        throw new Error('Wish list not found');
    }

    wishList.items = wishList.items.filter((item) => item.toString() !== itemId);
    await wishList.save();

    return wishList;
    } catch (error) {
    console.error('Error removing item from wish list:', error);
    throw new Error('Failed to remove item from wish list');
    }
}

// Get all items in the wish list
async function getWishListItems(userId) {
    try {
    const wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
        throw new Error('Wish list not found');
    }

    return wishList.items;
    } catch (error) {
    console.error('Error getting wish list items:', error);
    throw new Error('Failed to get wish list items');
    }
}

// Search for items in the wish list by name
async function searchWishListItems(userId, itemName) {
    try {
    const wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
        throw new Error('Wish list not found');
    }

    const items = wishList.items.filter((item) => item.name.toLowerCase().includes(itemName.toLowerCase()));
    return items;
    } catch (error) {
    console.error('Error searching wish list items:', error);
    throw new Error('Failed to search wish list items');
    }
}

module.exports = {
                    createWishList,
                    deleteWishList,
                    addToWishList,
                    removeFromWishList,
                    getWishListItems,
                    searchWishListItems,
                };
                