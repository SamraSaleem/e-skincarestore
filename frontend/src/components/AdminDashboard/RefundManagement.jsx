import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './admin.css';
import io from 'socket.io-client';
import Footer from './Footer';
import Header from './Header';

const RefundManagement = () => {
  const [refundRequests, setRefundRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Connect to WebSocket
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Listen for new refund requests
    newSocket.on('newRefundRequest', (newRequest) => {
      setRefundRequests(prev => [newRequest, ...prev]);
      setNotification(`New refund request received for Order ${newRequest.orderID}`);
      setTimeout(() => setNotification(null), 5000); // Clear notification after 5 seconds
    });

    // Fetch initial refund requests
    fetchRefundRequests();

    return () => newSocket.close();
  }, []);

  const fetchRefundRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/orders/refunds', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRefundRequests(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch refund requests');
      setLoading(false);
    }
  };

  const handleRefundAction = async (orderId, action, amount = null) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3001/api/orders/refund/${orderId}`,
        {
          action,
          refundAmount: amount
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update the local state
      setRefundRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === orderId
            ? {
                ...request,
                refundStatus: action === 'approve' ? 'Approved' : 
                             action === 'reject' ? 'Rejected' : 
                             action === 'process' ? 'Completed' : request.refundStatus,
                refundAmount: amount || request.refundAmount
              }
            : request
        )
      );

      // Emit the update through socket
      socket.emit('refundStatusUpdated', { orderId, action, amount });

      setNotification(`Refund ${action}d successfully`);
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error('Error processing refund:', error);
      setNotification('Failed to process refund');
      setTimeout(() => setNotification(null), 5000);
    }
  };

  if (loading) return <div style={{color: '#000'}}>Loading...</div>;
  if (error) return <div style={{color: '#000'}}>{error}</div>;

  return (
    <div className="home-container">
      <Header />

      <main className="main-content" style={{color: '#000'}}>
        <div style={{ 
          position: 'relative',
          width: '100%',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1 className="page-title">Refund Request Management</h1>
        </div>

        {notification && (
          <div className="notification">{notification}</div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          padding: '20px',
          width: '100%'
        }}>
          {refundRequests.map((request) => (
            <div key={request._id} className="refund-request-card" style={{
              width: '100%',
              margin: '0'
            }}>
              <div className="request-header">
                <h3>Order ID: {request.orderID}</h3>
                <span className={`status-badge ${request.refundStatus.toLowerCase()}`}>
                  {request.refundStatus}
                </span>
              </div>

              <div className="request-details">
                <p><strong>Customer:</strong> {request.user.name}</p>
                <p><strong>Order Total:</strong> ${request.totalPrice.toFixed(2)}</p>
                <p><strong>Refund Reason:</strong> {request.refundReason}</p>
                <p><strong>Request Date:</strong> {new Date(request.refundRequestedAt).toLocaleDateString()}</p>
              </div>

              {request.refundStatus === 'Requested' && (
                <div className="request-actions">
                  <input
                    type="number"
                    placeholder="Refund Amount"
                    className="refund-amount-input"
                    id={`refund-amount-${request._id}`}
                    max={request.totalPrice}
                  />
                  <button
                    onClick={() => {
                      const amount = document.getElementById(`refund-amount-${request._id}`).value;
                      handleRefundAction(request._id, 'approve', parseFloat(amount));
                    }}
                    className="approve-btn"
                  >
                    Approve Refund
                  </button>
                  <button
                    onClick={() => handleRefundAction(request._id, 'reject')}
                    className="reject-btn"
                  >
                    Reject Refund
                  </button>
                </div>
              )}

              {request.refundStatus === 'Approved' && !request.isRefunded && (
                <div className="request-actions">
                  <button
                    onClick={() => handleRefundAction(request._id, 'process')}
                    className="process-btn"
                  >
                    Process Refund
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundManagement; 