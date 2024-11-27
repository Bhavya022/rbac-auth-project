const Permission = require('../models/Permission');

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) return res.status(400).json({ message: 'Permission already exists' });

    const permission = new Permission({ name, description });
    await permission.save();
    res.status(201).json({ message: 'Permission created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
