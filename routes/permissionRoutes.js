const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { createPermission, getAllPermissions } = require('../controllers/permissionController');
router.post('/permissions', authenticate, authorizeRoles('admin'), createPermission);
router.get('/permissions', authenticate, getAllPermissions);

module.exports = router;
