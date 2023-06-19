const User = require('../models/UserSchema');
const UserService = require('../services/UserService');
const { updateNumOfOrders } = require('../services/UserService');

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
const getMyUser = async (req, res) => {
  try {
    const user = await UserService.getUser(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user details' });
  }
};

module.exports = { 
                    getMyUser,
                    saveUser
                 };
