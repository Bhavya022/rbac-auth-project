const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Permission name (e.g., read_users, write_articles)
  description: { type: String } // Optional description for clarity
});

module.exports = mongoose.model('Permission', PermissionSchema);
