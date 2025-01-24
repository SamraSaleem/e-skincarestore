import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/icon.png';
import '../AdminDashboard/admin.css';

const HomeHeader = () => {
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
            <li><a href="/" className="admin-nav-link">Home</a></li>
            <li><a href="/register" className="admin-nav-link">Register</a></li>
            <li><a href="/login" className="admin-nav-link">Login</a></li>
            <li><a href="/about" className="admin-nav-link">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader; 