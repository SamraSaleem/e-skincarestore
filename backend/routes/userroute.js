const express = require('express');
const { register, login, verifyAdminSystem } = require('../controllers/authController');  // Import named functions
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Verify admin system route
router.post('/verify-admin', verifyAdminSystem);

module.exports = router;
