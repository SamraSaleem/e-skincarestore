const Order = require('../models/ordermodel');
const Transaction = require('../models/transactionmodel');

// Fetch all orders (Admin Only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')  // Populating user details (e.g., name and email)
      .populate('orderItems.product', 'name price image');  // Populating product details for each item
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch a single order details (Admin Only)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price image');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);  // Return the full order details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateOrderStatus = async (req, res) => {
  const orderID = req.params.id;  // This will capture orderID
  console.log(orderID);
  
  // Check if orderID is in the "SAM-OrderID-XXX" format or a MongoDB ObjectId
  const isCustomOrderID = /^SAM-OrderID-\d{3}$/.test(orderID);  // Regex to check for "SAM-OrderID-XXX" format

  let order;
  try {
    if (isCustomOrderID) {
      // If it's the custom "SAM-OrderID-XXX" format, query using the custom orderID
      order = await Order.findOne({ orderID });  // Find by custom orderID
    } else {
      // Otherwise, assume it's a MongoDB ObjectId and query by _id
      order = await Order.findById(orderID);  // Find by ObjectId
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { orderStatus } = req.body;  // Destructure status from request body
    
    // Directly update the order's status
    if (!["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }
    
    order.orderStatus = orderStatus;  // Update the order's status

    await order.save();  // Save the updated order

    return res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all refund requests
const getRefundRequests = async (req, res) => {
  try {
    // Only get orders that have a refund request
    const refundRequests = await Order.find({
      $or: [
        { refundStatus: { $exists: true, $ne: null } },
        { isRefunded: true }
      ]
    })
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price image')
    .sort({ refundRequestedAt: -1 });
    
    if (!refundRequests) {
      return res.status(404).json({ message: 'No refund requests found' });
    }
    
    console.log('Refund requests found:', refundRequests.length); // Debug log
    res.json(refundRequests);
  } catch (error) {
    console.error('Error in getRefundRequests:', error);
    res.status(500).json({ 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// Handle refund actions (approve/reject/process)
const handleRefund = async (req, res) => {
  try {
    const { action, refundAmount } = req.body;
    const orderId = req.params.id;

    console.log('Processing refund action:', { orderId, action, refundAmount });

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    switch (action) {
      case 'approve':
        if (!refundAmount || refundAmount <= 0 || refundAmount > order.totalPrice) {
          return res.status(400).json({ 
            message: 'Invalid refund amount',
            maxAllowed: order.totalPrice 
          });
        }
        order.refundStatus = 'Approved';
        order.refundAmount = refundAmount;
        order.refundProcessedAt = new Date();
        break;

      case 'reject':
        order.refundStatus = 'Rejected';
        order.refundProcessedAt = new Date();
        break;

      case 'process':
        // Update payment status to refunded
        order.refundStatus = 'Completed';
        order.isRefunded = true;
        order.isPaid = false; // Change payment status to false when refunded
        order.refundProcessedAt = new Date();
        order.paymentResult.status = 'Refunded'; // Update payment result status
        order.adminNotes = order.adminNotes 
          ? `${order.adminNotes}\nRefund processed on ${new Date().toLocaleString()}`
          : `Refund processed on ${new Date().toLocaleString()}`;
        break;

      default:
        return res.status(400).json({ 
          message: 'Invalid action',
          allowedActions: ['approve', 'reject', 'process']
        });
    }

    const updatedOrder = await order.save();
    console.log('Order updated successfully:', updatedOrder);

    // Update transaction status if exists
    try {
      const transaction = await Transaction.findOne({ orderID: order.orderID });
      if (transaction) {
        transaction.status = order.isRefunded ? 'refunded' : 
                           order.isPaid ? 'completed' : 
                           'pending';
        await transaction.save();
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }

    res.json({ 
      message: 'Refund status updated successfully', 
      order: updatedOrder 
    });
  } catch (error) {
    console.error('Error in handleRefund:', error);
    res.status(500).json({ 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

const getRefundStats = async (req, res) => {
  try {
    // Get overall statistics
    const stats = await Order.aggregate([
      {
        $match: {
          refundStatus: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: null,
          totalRefunds: { $sum: 1 },
          pendingRefunds: {
            $sum: {
              $cond: [{ $eq: ["$refundStatus", "Requested"] }, 1, 0]
            }
          },
          completedRefunds: {
            $sum: {
              $cond: [{ $eq: ["$refundStatus", "Completed"] }, 1, 0]
            }
          },
          totalRefundAmount: {
            $sum: {
              $cond: [{ $eq: ["$refundStatus", "Completed"] }, "$refundAmount", 0]
            }
          }
        }
      }
    ]);

    // Get recent refunds
    const recentRefunds = await Order.find({
      refundStatus: { $exists: true, $ne: null }
    })
    .populate('user', 'name email')
    .sort({ refundRequestedAt: -1 })
    .limit(10);

    res.json({
      stats: stats[0] || {
        totalRefunds: 0,
        pendingRefunds: 0,
        completedRefunds: 0,
        totalRefundAmount: 0
      },
      recentRefunds
    });
  } catch (error) {
    console.error('Error getting refund statistics:', error);
    res.status(500).json({ 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

const requestRefund = async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const userId = req.user._id;

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update order with refund request
    order.refundStatus = 'Requested';
    order.refundReason = reason;
    order.refundRequestedAt = new Date();

    await order.save();

    // Emit socket event for real-time notification
    req.app.get('io').emit('newRefundRequest', {
      orderId: order.orderID,
      customerName: req.user.name,
      amount: order.totalPrice,
      reason
    });

    res.json({ message: 'Refund request submitted successfully' });
  } catch (error) {
    console.error('Error requesting refund:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getOrders, getOrderById, updateOrderStatus, getRefundRequests, handleRefund, getRefundStats, requestRefund };
