import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './admin.css';
import Footer from './Footer';
import Header from './Header';
const OrderStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Valid statuses as per Mongoose model
  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        navigate('/view_order');
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/orders/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/orders/status/${orderId}`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUpdateSuccess(true);
      // Update local state
      setOrder(prev => ({ ...prev, orderStatus: newStatus }));
      
      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate('/view_order');
      }, 2000);
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>No order found</div>;

  return (
    <div className="home-container">
      {/* Header */}
      <Header />


      <main className="main-content">
        <div className="status-update-container">
          <h2>Update Order Status</h2>
          
          {updateSuccess && (
            <div className="success-message">
              Status updated successfully! Redirecting...
            </div>
          )}

          <div className="order-info">
            <p><strong>Order ID:</strong> {order.orderID}</p>
            <p><strong>Customer Name:</strong> {order.user?.name || 'N/A'}</p>
            <p><strong>Current Status:</strong> 
              <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                {order.orderStatus}
              </span>
            </p>
            <p><strong>Total Amount:</strong> ${order.totalPrice?.toFixed(2)}</p>
          </div>
          
          <div className="status-options">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`status-btn ${order.orderStatus === status ? 'active' : ''}`}
                disabled={order.orderStatus === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatus;
