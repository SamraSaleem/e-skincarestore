import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import Footer from "./Footer";
import Header from './Header';

const OrderManagement = () => {
  return (
    <div className="home-container">
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Manage Orders</h1>
        <div className="manage-options" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          padding: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Link to="/view_order" className="manage-option-btn" style={{
            width: '100%',
            margin: '0'
          }}>View Orders</Link>
          <Link to="/order_status" className="manage-option-btn" style={{
            width: '100%',
            margin: '0'
          }}>Order Status Management</Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderManagement;
