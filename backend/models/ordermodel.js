const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true, unique: true }, // New field for order ID
    // User reference (for customers)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'  // Make sure this matches your User model name
    },

    // Order Items (Shared by both users and admins)
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "product", // Reference to Product model
        },
      },
    ],

    // Shipping Address (Shared by both users and admins)
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        contactNumber: { type: String, required: true }, // New field for contact number
      }, 
    billingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        contactNumber: { type: String, required: true }, // New field for contact number
      },   

    // Payment Details
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String }, // Transaction ID (Admin's view)
      status: { type: String }, // Payment status
      update_time: { type: String }, // Last update time
      email_address: { type: String }, // Payer's email (Admin's view)
    },

    // Financial Data
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    // Status Tracking
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date }, // Only populated for completed payments
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }, // Only populated for completed deliveries

    // Admin Fields
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    adminNotes: { type: String }, // Admin's internal notes about the order

    // Refund Details
    isRefunded: { type: Boolean, required: true, default: false }, // High-level flag
    refundRequestedAt: { type: Date }, // When the refund was requested
    refundProcessedAt: { type: Date }, // When the refund was processed
    refundStatus: {
      type: String,
      enum: ["Requested", "Approved", "Processed", "Completed", "Rejected"],
      default: null,
    }, // Detailed refund state
    refundReason: { type: String }, // Reason provided by the user
    refundAmount: { type: Number, default: 0.0 }, // Amount refunded, if partial
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);
// Pre-save hook to generate orderID
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
      try {
        // Get the last order by sorting by orderID in descending order
        const lastOrder = await this.constructor.findOne().sort({ orderID: -1 }).exec();
        let newOrderID = 'SAM-OrderID-001';  // Default value if no previous orders exist
  
        if (lastOrder) {
          // Extract the numeric part, increment it, and pad it to 3 digits
          const lastOrderID = lastOrder.orderID;
          const lastOrderNumber = parseInt(lastOrderID.split('-')[2]);
          const newOrderNumber = lastOrderNumber + 1;
          newOrderID = `SAM-OrderID-${String(newOrderNumber).padStart(3, '0')}`;
        }
  
        // Set the new orderID
        this.orderID = newOrderID;
      } catch (error) {
        console.error('Error generating orderID:', error);
      }
    }
    next();
  });
  

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
