import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/icon.png';
import './admin.css';

const Header = () => {
  return (
    <header className="w-full bg-white">
      {/* Welcome Box */}
      <div >
        <div>
          <div className="welcome-box">
            <p className="text-white text-sm font-medium">
              Welcome to SAM E-GLOWCo Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* White Background Content */}
      <div className="bg-white w-full">
        {/* Logo Container */}
        <div className="logo-wrapper">
          <Link to="/admin-dashboard" className="block">
            <img 
              src={icon} 
              alt="SAM E-GLOWCo"
              className="admin-logo"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          <ul className="admin-nav-list">
            <li><Link to="/admin-dashboard" className="admin-nav-link">Dashboard</Link></li>
            <li><Link to="/product_manage" className="admin-nav-link">Manage Products</Link></li>
            <li><Link to="/order_manage" className="admin-nav-link">Manage Orders</Link></li>
            <li><Link to="/transaction_manage" className="admin-nav-link">Manage Transactions</Link></li>
            <li className="product-dropdown-container">
              <span className="admin-nav-link product-link">
                Refund Management
              </span>
              <div className="product-dropdown">
                <Link to="/refund_management" className="dropdown-item">Refund Requests</Link>
                <Link to="/refund_reports" className="dropdown-item">Refund Reports</Link>
              </div>
            </li>
            <li><Link to="/analytics" className="admin-nav-link">Analytics</Link></li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 