const express = require('express');
const router = express.Router();
const { getUserProfile, getAdminDashboard, updateUserRoles } = require('../controllers/protectedController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const logAudit = require('../middleware/logAudit');
router.use(authenticate, logAudit);
router.get('/profile', getUserProfile);
router.get('/admin/dashboard', authorizeRoles('admin'), getAdminDashboard);
router.put('/admin/update-roles', authorizeRoles('admin', 'manager'), updateUserRoles);

module.exports = router;
