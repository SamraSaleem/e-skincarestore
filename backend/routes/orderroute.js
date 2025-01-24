const express = require('express');
const {getOrders, getOrderById, updateOrderStatus, getRefundRequests, handleRefund, getRefundStats, requestRefund} = require('../controllers/orderController.js');

const { verifyAdmin, verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

// Place specific routes before parameterized routes
router.get('/refunds', verifyAdmin, getRefundRequests);
router.patch('/refund/:id', verifyAdmin, handleRefund);
router.get('/refund-stats', verifyAdmin, getRefundStats);
router.post('/request-refund', verifyToken, requestRefund);

// General routes
router.get('/', verifyAdmin, getOrders);

router.get('/:id',verifyAdmin, getOrderById);

router.patch('/status/:id', verifyAdmin, updateOrderStatus);

module.exports = router;
