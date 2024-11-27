const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Role name (e.g., Admin, User)
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] // Array of Permission references
});

module.exports = mongoose.model('Role', RoleSchema);
