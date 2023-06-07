const User = require('../models/UserSchema');
const { updateNumOfOrders } = require('../services/UserServices');

async function saveUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();

    // Call the updateNumOfOrders function
    await updateNumOfOrders(user);

    res.status(200).json({ message: 'User saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user.' });
  }
}

module.exports = { 
                    saveUser
                 };
