const OrderService = require('../services/OrderService');
const CartService = require('../services/CartService'); 


// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Create a new order
async function createOrder(req, res) {
  try {
    // Get the cart items
    const cartItems = await CartService.getCartItems(req.userId);

    // Create the orderData object
    const orderData = {
      orderItems: cartItems.map(item => ({
        item: item.itemId,
        quantity: item.quantity,
      })),
      deliveryMethod: req.body.deliveryMethod,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      promoCode: req.body.promoCode,
      username: req.user ? req.user.username : req.body.email,
    };

    const order = await OrderService.createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Update an order by ID
async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const updateData = req.body;

    const order = await OrderService.updateOrder(orderId, updateData);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Delete an order by ID
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;

    const result = await OrderService.deleteOrder(orderId);

    if (result) {
      res.status(200).json({ message: `Order number ${orderId} deleted successfully` });
    } else {
      res.status(404).json({ message: 'Could not find the order' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the order' });
  }
}


// Get an order by ID
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;

    const order = await OrderService.getOrderById(orderId);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Search orders by given filter
async function searchOrders(req, res) {
  try {
    const filter = req.query;
    const orders = await OrderService.searchOrders(filter);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  searchOrders,
  //getAllUserOrders
};

