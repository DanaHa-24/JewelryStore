const Address = require('../models/AddressSchema');
const User = require('../models/UserSchema');
const UserService = require('../services/UserService');
const { updateNumOfOrders } = require('../services/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Create a new user
async function createUser(req, res) {
  const userData = req.body;
  try {
    const newUser = await UserService.createUser(userData);
    // Redirect to the homepage
    res.redirect('/homepage.html');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Update an user by ID
async function updateUser(req, res) {
  const { id } = req.params.userId;
  const updateData = req.body;
  try {
    const updatedUser = await UserService.updateUser(id, updateData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Delete an user by ID
async function deleteUser(req, res) {
  const { id } = req.params.userId;
  try {
    const message = await UserService.deleteUser(id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Get an user by ID
async function getUserById(req, res) {
  const { id } = req.params.userId;
  try {
    const user = await UserService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Search users by filter
async function searchUsers(req, res) {
  const { filter } = req.params;
  try {
    const users = await UserService.searchUsers(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Get user's order history by ID
async function getUserOrderHistory(req, res) {
  try {
    const userId = req.params.userId;
    const orderHistory = await UserService.getUserOrderHistory(userId);
    res.json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
}


// Get user's addresses by ID
async function getUserAddresses(req, res) {
  try {
    const userId = req.params.userId;
    const myAddresses = await UserService.getUserAddresses(userId);
    res.json(myAddresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
}


// Get user's wishlist by ID
async function getUserWishlist(req, res) {
  try {
    const userId = req.params.userId;
    const myWishlist = await UserService.getUserWishlist(userId);
    res.json(myWishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
}


// Get user's cart by ID
async function getUserMyCart(req, res) {
  try {
    const userId = req.params.userId;
    const MyCart = await UserService.getUserMyCart(userId);
    res.json(MyCart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch my cart' });
  }
}


// Update num of orders in user
async function saveUser(req, res) {
  try {
    console.log('Inside getMyUSer');
    const user = new User(req.body);
    console.log('User data:', user); // Added rto debug
    await user.save();

    // Call the updateNumOfOrders function
    await updateNumOfOrders(user);

    res.status(200).json({ message: 'User saved successfully.' });
  } catch (error) {
    console.error('Error:', error); // Added rto debug
    console.error('Failed to save user:', error);
    res.status(500).json({ error: 'Failed to save user.' });
  }
}


// User logged-in
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function register(req, res, next) {
  try {
    const { firstName, lastName, emailSignin, password,address,phoneNumber} = req.body;
    console.log(emailSignin);
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      emailSignin,
      password: hash,
      address,
      phoneNumber
    });
    console.log("3");
    console.log("4");
    res.redirect('/homePage.html'); // Replace with the desired redirect location
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
}


// Get logged-in user details
async function getMyUser(req, res) {
  try {
    const user = await UserService.getUser(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user details' });
  }
}


module.exports = { 
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    login,
    register,
    getMyUser,
    getUserOrderHistory,
    getUserAddresses,
    getUserWishlist,
    getUserMyCart
};