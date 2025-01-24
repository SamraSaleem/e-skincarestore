const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');
const {
  getTransactions,
  getTransactionById,
  getTransactionsByDateRange,
  updateTransactionStatus,
  processRefund
} = require('../controllers/transactionController');

// Get all transactions
router.get('/', verifyAdmin, getTransactions);

// Get transactions by date range
router.get('/range', verifyAdmin, getTransactionsByDateRange);

// Get transaction by ID
router.get('/:id', verifyAdmin, getTransactionById);

// Update transaction status (for refunds)
router.patch('/:orderId/status', verifyAdmin, updateTransactionStatus);

// Process refund
router.post('/:orderId/refund', verifyAdmin, processRefund);

module.exports = router; 