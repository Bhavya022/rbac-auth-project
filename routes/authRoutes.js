const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');
router.post('/register', rateLimiter, registerUser); 
router.post('/login', rateLimiter, loginUser);      
router.post('/logout', authenticate, logoutUser);    

module.exports = router;
