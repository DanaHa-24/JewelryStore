const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

const handleRegister = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.validate();

    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

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

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { handleRegister, handleLogin };
