import React, { useState } from 'react';
import axios from 'axios';
import './customer.css';

const RequestRefund = ({ orderId, totalAmount }) => {
  const [reason, setReason] = useState('');
  const [notification, setNotification] = useState(null);

  const handleRefundRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/orders/request-refund', {
        orderId,
        reason,
        amount: totalAmount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotification('Refund request submitted successfully');
      setReason('');
    } catch (error) {
      setNotification('Failed to submit refund request');
    }
  };

  return (
    <div className="refund-request-form">
      <h3 style={{ color: '#ef80ae' }}>Request Refund</h3>
      {notification && <div className="notification">{notification}</div>}
      <div className="refund-details" style={{ marginBottom: '20px' }}>
        <p style={{ color: '#ef80ae' }}><strong>Order ID:</strong> {orderId}</p>
        <p style={{ color: '#ef80ae' }}><strong>Status:</strong> Completed</p>
        <p style={{ color: '#ef80ae' }}><strong>Customer:</strong> {customerName}</p>
        <p style={{ color: '#ef80ae' }}><strong>Order Total:</strong> ${totalAmount}</p>
        <p style={{ color: '#ef80ae' }}><strong>Request Date:</strong> {new Date().toLocaleDateString()}</p>
      </div>
      <form onSubmit={handleRefundRequest}>
        <div className="form-group">
          <label style={{ color: '#ef80ae' }}>Reason for Refund:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="Please explain why you want a refund..."
            style={{ 
              border: '1px solid #ef80ae',
              borderRadius: '4px',
              padding: '10px',
              marginTop: '5px',
              width: '100%',
              minHeight: '100px'
            }}
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          style={{
            backgroundColor: '#ef80ae',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d15c8a'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ef80ae'}
        >
          Submit Refund Request
        </button>
      </form>
    </div>
  );
};

export default RequestRefund; 