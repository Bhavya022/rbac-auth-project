const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: 'Role already exists' });

    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json({ message: 'Role created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign role to user
exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
      await user.save();
    }
    res.json({ message: 'Role assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
