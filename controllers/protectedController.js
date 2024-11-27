const User = require('../models/User'); 
const mongoose = require('mongoose');   
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile fetched successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.getAdminDashboard = (req, res) => {
  try {
    res.status(200).json({ 
      message: 'Welcome to the admin dashboard', 
      data: {
        activeUsers: 120, 
        newRegistrations: 15,
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.updateUserRoles = async (req, res) => {
  const { userId, newRole } = req.body; 

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.roles = [newRole]; 
    await user.save();

    res.status(200).json({ 
      message: `User role updated successfully`,
      updatedUser: {
        id: user.id,
        email: user.email,
        roles: user.roles
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
