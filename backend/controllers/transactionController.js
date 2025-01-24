const Order = require('../models/ordermodel');

// Get all transactions with detailed information
const getTransactions = async (req, res) => {
  try {
    // Get all orders
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email',
        model: 'users'
      })
      .sort({ createdAt: -1 });

    const transactions = orders.map(order => {
      // Determine the status based on payment and refund status
      let status;
      if (order.isRefunded) {
        status = 'refunded';
      } else if (order.isPaid) {
        status = 'completed';
      } else {
        status = 'pending';
      }

      return {
        _id: order._id,
        transactionId: `TRX-${order.orderID}`,
        orderID: order.orderID,
        user: {
          name: order.user ? order.user.name : 'N/A',
          email: order.user ? order.user.email : 'N/A'
        },
        amount: order.totalPrice || 0,
        status: status,
        paymentMethod: order.paymentMethod || 'N/A',
        createdAt: order.paidAt || order.createdAt,
        updatedAt: order.updatedAt,
        isPaid: order.isPaid,
        isRefunded: order.isRefunded,
        refundDetails: order.isRefunded ? {
          refundAmount: order.refundAmount,
          refundDate: order.refundProcessedAt,
          refundReason: order.refundReason
        } : null
      };
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get transactions by date range
const getTransactionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const orders = await Order.find({
      isPaid: true,
      paidAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    })
    .populate({
      path: 'user',
      select: 'name email',
      model: 'users'
    })
    .sort({ paidAt: -1 });

    const transactions = orders.map(order => ({
      _id: order._id,
      transactionId: `TRX-${order.orderID}`,
      orderID: order.orderID,
      user: {
        name: order.user ? order.user.name : 'N/A',
        email: order.user ? order.user.email : 'N/A'
      },
      amount: order.totalPrice || 0,
      status: order.isRefunded ? 'refunded' : 
              order.isPaid ? 'completed' : 
              'pending',
      paymentMethod: order.paymentMethod || 'N/A',
      createdAt: order.paidAt || order.createdAt,
      updatedAt: order.updatedAt
    }));
    
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions by date range:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email',
        model: 'users'
      });
    
    if (!order) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const transaction = {
      _id: order._id,
      transactionId: `TRX-${order.orderID}`,
      orderID: order.orderID,
      user: {
        name: order.user ? order.user.name : 'N/A',
        email: order.user ? order.user.email : 'N/A'
      },
      amount: order.totalPrice || 0,
      status: order.isRefunded ? 'refunded' : 
              order.isPaid ? 'completed' : 
              'pending',
      paymentMethod: order.paymentMethod || 'N/A',
      createdAt: order.paidAt || order.createdAt,
      updatedAt: order.updatedAt
    };
    
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update transaction status (for refunds)
const updateTransactionStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, refundReason, refundAmount } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status === 'refunded') {
      order.isRefunded = true;
      order.refundStatus = 'Completed';
      order.refundAmount = refundAmount || order.totalPrice;
      order.refundReason = refundReason;
      order.refundProcessedAt = new Date();
      // Keep isPaid as true since it was paid before being refunded
      order.isPaid = true;
    }

    await order.save();

    res.json({
      message: 'Transaction status updated successfully',
      transaction: {
        _id: order._id,
        orderID: order.orderID,
        status: 'refunded',
        refundDetails: {
          refundAmount: order.refundAmount,
          refundDate: order.refundProcessedAt,
          refundReason: order.refundReason
        }
      }
    });
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add this route to handle refund requests
const processRefund = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { refundReason, refundAmount } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order is eligible for refund
    if (!order.isPaid) {
      return res.status(400).json({ message: 'Order must be paid to be refunded' });
    }

    if (order.isRefunded) {
      return res.status(400).json({ message: 'Order is already refunded' });
    }

    // Process refund
    order.isRefunded = true;
    order.refundStatus = 'Completed';
    order.refundAmount = refundAmount || order.totalPrice;
    order.refundReason = refundReason;
    order.refundProcessedAt = new Date();

    await order.save();

    res.json({
      message: 'Refund processed successfully',
      transaction: {
        _id: order._id,
        orderID: order.orderID,
        status: 'refunded',
        refundDetails: {
          refundAmount: order.refundAmount,
          refundDate: order.refundProcessedAt,
          refundReason: order.refundReason
        }
      }
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  getTransactionsByDateRange,
  updateTransactionStatus,
  processRefund
}; 