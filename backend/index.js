const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');  // Import jsonwebtoken
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/userroute');  // Correct import path for authRoutes
const productRoute = require('./routes/productroute');
const orderRoute = require('./routes/orderroute');
const transactionRoute = require('./routes/transactionRoute');
const analyticsRoute = require('./routes/analyticsRoute');
const { verifyAdmin } = require('./middleware/authMiddleware');
const app = express();

dotenv.config();
connectDB();

// Enable CORS for all origins
app.use(cors());  // This allows requests from any origin (for development)

// Enable JSON parsing
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'middleware/uploads')));

// Define your routes
app.use('/api/auth', authRoutes);  // Use the authRoutes for registration and login
app.use('/api/product', productRoute);  // Use the productRoute for product-related operations, requiring JWT authentication
app.use('/api/orders', orderRoute);  // Use the orderRoute for order-related operations, requiring JWT authentication
app.use('/api/transactions', transactionRoute);  // Use the transactionRoute for transaction-related operations, requiring JWT authentication
app.use('/api/analytics', analyticsRoute);  // Use the analyticsRoute for analytics-related operations, requiring JWT authentication
// Example protected route
app.get('/api/admin-data', verifyAdmin, (req, res) => {
  res.json({ message: 'This is admin-only data' });
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"]
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('refundStatusUpdated', (data) => {
    // Broadcast the update to all connected clients except sender
    socket.broadcast.emit('refundStatusUpdate', data);
  });

  socket.on('newRefundRequest', (data) => {
    // Broadcast to all admin clients
    io.emit('adminRefundNotification', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
