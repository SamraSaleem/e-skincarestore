import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import Footer from './Footer';
import Header from './Header';
const RefundReports = () => {
  const [refundStats, setRefundStats] = useState({
    totalRefunds: 0,
    pendingRefunds: 0,
    completedRefunds: 0,
    totalRefundAmount: 0,
  });
  const [recentRefunds, setRecentRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRefundData();
  }, []);

  const fetchRefundData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/orders/refund-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRefundStats(response.data.stats);
      setRecentRefunds(response.data.recentRefunds);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch refund statistics');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state">Loading refund data...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="home-container">
     <Header />

      <main className="main-content">
        <h1 className="page-title">Refund Reports and Statistics</h1>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between', margin: '20px 0' }}>
          <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>Total Refunds</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{refundStats.totalRefunds}</p>
          </div>

          <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>Pending Refunds</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{refundStats.pendingRefunds}</p>
          </div>

          <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>Completed Refunds</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{refundStats.completedRefunds}</p>
          </div>

          <div style={{ flex: '1', minWidth: '200px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>Total Refund Amount</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>${refundStats.totalRefundAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="table-container">
          <table className="refund-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Refund Amount</th>
                <th>Status</th>
                <th>Request Date</th>
                <th>Process Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRefunds.map((refund) => (
                <tr key={refund._id}>
                  <td>{refund.orderID}</td>
                  <td>{refund.user.name}</td>
                  <td>${refund.refundAmount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${refund.refundStatus.toLowerCase()}`}>
                      {refund.refundStatus}
                    </span>
                  </td>
                  <td>{new Date(refund.refundRequestedAt).toLocaleDateString()}</td>
                  <td>
                    {refund.refundProcessedAt 
                      ? new Date(refund.refundProcessedAt).toLocaleDateString()
                      : 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RefundReports; 