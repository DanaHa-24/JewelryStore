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
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getClientUser(req, res) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('Auth failed!');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserService.getUserById(decodedToken.userId);
    if (!user) throw new Error('Auth failed!');
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Auth failed!' });
  }
}

// Update an user by ID
async function updateUser(req, res) {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await UserService.updateUser(userId, updateData);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Delete an user by ID
async function deleteUser(req, res) {
  const { userId } = req.params;
  try {
    const message = await UserService.deleteUser(userId);
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Get an user by ID
async function getUserById(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) throw new Error('User ID is required');
    const user = await UserService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
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
    const userId = req.user._id;
    const orderHistory = await UserService.getUserOrderHistory(userId);
    res.json(orderHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// Get user's addresses by ID
async function getUserAddresses(req, res) {
  try {
    const userId = req.user._id;
    const myAddresses = await UserService.getUserAddresses(userId);
    res.json(myAddresses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// Get user's wishlist by ID
async function getUserWishlist(req, res) {
  try {
    const userId = req.user._id;
    const myWishlist = await UserService.getUserWishlist(userId);
    res.json(myWishlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// Get user's cart by ID
async function getUserMyCart(req, res) {
  try {
    const userId = req.user._id;
    const MyCart = await UserService.getUserMyCart(userId);
    res.json(MyCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
    const { firstName, lastName, emailSignin, password, address, phoneNumber } = req.body;
    console.log(emailSignin);
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      emailSignin,
      password: hash,
      address,
      phoneNumber,
    });
    console.log('3');
    console.log('4');
    res.redirect('/homePage.html'); // Replace with the desired redirect location
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  searchUsers,
  login,
  register,
  getUserOrderHistory,
  getUserAddresses,
  getUserWishlist,
  getUserMyCart,
  getClientUser,
};
