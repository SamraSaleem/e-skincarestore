import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './admin.css';
import Footer from './Footer';
import Header from './Header';
const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:3001/api/transactions/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const formattedTransactions = response.data.map(transaction => ({
        _id: transaction._id,
        transactionId: transaction.transactionId || `TRX-${transaction.orderID}`,
        orderID: transaction.orderID,
        user: {
          name: transaction.user?.name || 'N/A',
          email: transaction.user?.email || 'N/A'
        },
        amount: transaction.amount || transaction.totalPrice || 0,
        status: transaction.isRefunded ? 'refunded' : 
                transaction.isPaid ? 'completed' : 
                'pending',
        paymentMethod: transaction.paymentMethod || 'N/A',
        createdAt: transaction.createdAt || transaction.paidAt || new Date(),
      }));

      setTransactions(formattedTransactions);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.response?.data?.message || 'Failed to fetch transactions');
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Update this effect to call fetchTransactions directly
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchTransactions();
    }
  }, [dateRange, fetchTransactions]);

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        (transaction.orderID?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (transaction.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      
      const transactionDate = new Date(transaction.createdAt);
      const matchesDate = 
        (!dateRange.start || transactionDate >= new Date(dateRange.start)) &&
        (!dateRange.end || transactionDate <= new Date(dateRange.end));

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-badge completed';
      case 'pending':
        return 'status-badge pending';
      case 'refunded':
        return 'status-badge refunded';
      default:
        return 'status-badge';
    }
  };

  if (loading) return <div className="loading-state">Loading transaction data...</div>;
  if (error) return <div className="error-state">{error}</div>;

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="home-container">
      <Header />

      <main className="main-content">
        <h1 className="page-title">Transaction History</h1>
        <div className="transaction-stats" style={{display: 'flex', gap: '20px', justifyContent: 'space-between', margin: '20px 0'}}>
          <div className="stats-card" style={{flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#f5f5f5', textAlign: 'center'}}>
            <h3 style={{margin: '0 0 10px 0'}}>Total Transactions</h3>
            <p className="stats-number" style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>{transactions.length}</p>
          </div>
          <div className="stats-card" style={{flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#f5f5f5', textAlign: 'center'}}>
            <h3 style={{margin: '0 0 10px 0'}}>Total Amount</h3>
            <p className="stats-number" style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>${transactions.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}</p>
          </div>
          <div className="stats-card" style={{flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#f5f5f5', textAlign: 'center'}}>
            <h3 style={{margin: '0 0 10px 0'}}>Completed Payments</h3>
            <p className="stats-number" style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>{transactions.filter(t => t.status === 'completed').length}</p>
          </div>
          <div className="stats-card" style={{flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#f5f5f5', textAlign: 'center'}}>
            <h3 style={{margin: '0 0 10px 0'}}>Refunded Payments</h3>
            <p className="stats-number" style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>{transactions.filter(t => t.status === 'refunded').length}</p>
          </div>
        </div>

        <div className="table-container">
          <div className="filters-section" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* Search Filter */}
            <div className="search-filter" style={{ flex: '2' }}>
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',  // Fixed height
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Group status and date filters together */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '25px',
              flex: '1'
            }}>
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  height: '40px',  // Fixed height
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  width: '150px',  // Fixed width
                  fontSize: '14px'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>

              {/* Date Range Filter */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px'
              }}>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  style={{
                    height: '40px',  // Fixed height
                    width: '150px',  // Fixed width
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  style={{
                    height: '40px',  // Fixed height
                    width: '150px',  // Fixed width
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-transactions">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="transaction-row">
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.orderID}</td>
                    <td className="customer-name">
                      {transaction.user?.name || 'N/A'}
                    </td>
                    <td>${(transaction.amount || 0).toFixed(2)}</td>
                    <td>
                      <span className={getStatusColor(transaction.status || 'pending')}>
                        {transaction.status || 'pending'}
                      </span>
                    </td>
                    <td>{transaction.paymentMethod || 'N/A'}</td>
                    <td>
                      <div>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                      <div className="transaction-time">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TransactionManagement;