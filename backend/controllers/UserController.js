const Address = require('../models/AddressSchema');
const User = require('../models/UserSchema');
const UserService = require('../services/UserService');
const { updateNumOfOrders } = require('../services/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
async function createUser(req, res) {
  try {
      const { username, email, password, address, phoneNumber } = req.body;
      const user = await userService.createUser(username, email, password, address, phoneNumber);
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Failed to create the user.' });
  }
};

// Get all users
async function getAllUsers(req, res) {
  try {
      const users = await userService.getAllUsers();
      res.json(users);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

// Get a user by ID
async function getUserById(req, res) {
  try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ error: 'User not found.' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the user.' });
  }
};

// Update a user
async function updateUser(req, res) {
  try {
      const userId = req.params.id;
      const { username, email, password, address, phoneNumber } = req.body;
      const updatedUser = await userService.updateUser(userId, username, email, password, address, phoneNumber);
      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).json({ error: 'User not found.' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to update the user.' });
  }
};

// Delete a user
async function deleteUser(req, res) {
  try {
      const userId = req.params.id;

      const deletedUser = await userService.deleteUser(userId);
      if (deletedUser) {
          res.json(deletedUser);
      } else {
          res.status(404).json({ error: 'User not found.' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete the user.' });
  }
};

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


// Get logged-in user details
async function getMyUser(req, res) {
  try {
    const user = await UserService.getUser(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user details' });
  }
};

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

module.exports = { 
                    getMyUser,
                    saveUser,
                    createUser,
                    getAllUsers,
                    getUserById,
                    updateUser,
                    deleteUser,
                    register
                 };
