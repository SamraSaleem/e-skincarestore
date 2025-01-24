import React from 'react';
import './auth.css';

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: January 2024</p>
      </div>

      <div className="content-section">
        <div className="policy-content">
          <div className="policy-section">
            <h2>Information We Collect</h2>
            <p>At SAM E GLOW, we collect the following types of information:</p>
            <ul>
              <li>Personal information (name, email, shipping address)</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Shopping preferences and history</li>
              <li>Website usage data and cookies</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order updates and shipping notifications</li>
              <li>Provide customer support</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Improve our products and services</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Information Security</h2>
            <p>We implement strict security measures to protect your personal information:</p>
            <ul>
              <li>Secure SSL encryption for all transactions</li>
              <li>Regular security audits</li>
              <li>Limited access to personal information</li>
              <li>Secure data storage systems</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request deletion of your account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 