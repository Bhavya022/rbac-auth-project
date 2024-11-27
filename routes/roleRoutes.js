const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { createRole, getAllRoles, assignRoleToUser } = require('../controllers/roleController');
router.post('/roles', authenticate, authorizeRoles('admin'), createRole);
router.get('/roles', authenticate, authorizeRoles('admin'), getAllRoles);
router.put('/assign-role', authenticate, authorizeRoles('admin'), assignRoleToUser);

module.exports = router;
