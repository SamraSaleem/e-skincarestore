const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');
const { getSalesAnalytics } = require('../controllers/analyticsController');

router.get('/sales', verifyAdmin, getSalesAnalytics);

module.exports = router; 