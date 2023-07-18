const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const WishlistService = require('../services/WishListService');
const Address = require('../models/AddressSchema');

// Handle registration - create wishlist for new user and save his data
const handleRegister = async (req, res) => {
  try {
    const address = new Address(req.body.address);
    await address.validate();
    await address.save();
    req.body.address = address._id;
    const user = new User(req.body);
    await user.validate();
    const wishList = await WishlistService.createWishlist(user._id);
    console.log(wishList);
    user.myWishList = wishList._id;
    await user.save();
    res.send({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// Handle login - verify user's input to his information at DB
const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error('Missing username or password');
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Incorrect password');
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log(secretKey);
    const token = jwt.sign({ userId: user._id }, secretKey);
    console.log(`User ${user.username} logged in successfully`);
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// Check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('Auth failed!');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error('Auth failed!');
    if (user.role !== 'admin') throw new Error('You are not an admin!');
    req.user = user;
    res.send({ message: 'User is admin' });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Auth failed!' });
  }
};

module.exports = { 
  handleRegister, 
  handleLogin, 
  isAdmin
};
