const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

// Validate if the logged user is an admin
const adminAuthValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('Auth failed!');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error('Auth failed!');
    if (user.role !== 'admin') throw new Error('You are not an admin!');
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Auth failed!' });
  }
};

module.exports = adminAuthValidation;
