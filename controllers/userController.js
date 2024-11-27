const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password, roles });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('roles');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('roles');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.logoutUser = (req, res) => {
  // This can be handled on the client-side, just remove the token from the client
  res.json({ message: 'User logged out successfully' });
};