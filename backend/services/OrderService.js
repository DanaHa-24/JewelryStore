const Order = require('../models/OrderSchema');
const Item = require('../models/ItemSchema');
const User = require('../models/UserSchema');

// Get all orders
async function getAllOrders() {
  const orders = await Order.find();
  return orders;
}

// Create a new order
async function createOrder(userId, orderData) {
  const orderNumber = (await Order.countDocuments()) + 1;
  orderData.orderNumber = orderNumber.toString().padStart(10, '0');

  // Update the stock of the items in the order
  orderData.orderItems.forEach(async (item) => {
    const itemToUpdate = await Item.findById(item.item);
    console.log(itemToUpdate.amountInStock);
    itemToUpdate.amountInStock -= item.quantity;
    console.log(itemToUpdate.amountInStock);
    itemToUpdate.howManySold += item.quantity;
    await itemToUpdate.save();
  });

  const order = new Order(orderData);
  order.numOfItems = orderData.orderItems.length;
  order.username = userId;
  await order.save();
  const user = await User.findById(userId);
  user.orderHistory.push(order._id);
  user.numOfOrders++;
  await user.save();
  return order;
}

// Update an order by order ID
async function updateOrder(orderId, updateData) {
  console.log(orderId);
  console.log(updateData);
  const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }
  //

  return order;
}

// Delete an order by ID
async function deleteOrder(orderId) {
  const result = await Order.findByIdAndDelete(orderId);
  return result !== null;
}

// Get an order by ID
async function getOrderById(orderId) {
  const order = await Order.findById(orderId).populate('orderItems.item');
  if (!order) {
    console.log(`Order with ID ${orderId} not found.`);
  }
  return order;
}

// Search orders by given filter
async function searchOrders(filter) {
  const orders = await Order.find(filter);
  return orders;
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  searchOrders,
};
