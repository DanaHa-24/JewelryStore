const Order = require('../models/OrderSchema');
const Item = require('../models/ItemSchema');


// Get all orders
async function getAllOrders() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error('Failed to fetch store branches');
  }
}


// Create a new order
async function createOrder(orderData) {
  // Generate a 10-digit order ID (in ascending order)
  const lastOrder = await Order.findOne().sort({ orderNumber: -1 }).limit(1);
  let orderNumber = 1;
  if (lastOrder) {
    orderNumber = parseInt(lastOrder.orderNumber) + 1;
  }
  orderData.orderNumber = orderNumber.toString().padStart(10, '0');

  // Calculate total price and number of items
  let totalPrice = 0;
  let numOfItems = 0;

  orderData.orderItems.forEach(item => {
    totalPrice += item.item.price * item.quantity;
    numOfItems += item.quantity;
  });

  orderData.totalPrice = totalPrice;
  orderData.numOfItems = numOfItems;

  // Update delivery method, address, payment method, state, and other fields as required
  // based on the orderData object

  const order = new Order(orderData);
  await order.save();
  return order;
}


// Update an order by order ID
async function updateOrder(orderId, updateData) {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  // Update specific fields based on the updateData
  if (updateData.state) {
    order.state = updateData.state;
  }
  // Add more fields to update here as needed

  await order.save();
  return order;
}


// Delete an order by ID
async function deleteOrder(orderId) {
  const result = await Order.findByIdAndDelete(orderId);
  return result !== null;
}


// Get an order by ID
async function getOrderById(orderId) {
  const order = await Order.findById(orderId);
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


// Get all orders for a user
async function getAllUserOrders(username) {
  const orders = await Order.find({ username })
    .populate({
      path: 'orderItems.item',
      select: 'name price', // Include only the desired fields of the item
    })
    .populate({
      path: 'orderItems',
      select: 'quantity',
    })
    .populate('address');

  return orders;
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  searchOrders,
  getAllUserOrders
};