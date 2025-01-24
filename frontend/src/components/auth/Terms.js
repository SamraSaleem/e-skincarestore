import React from 'react';
import './auth.css';

const Terms = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Terms & Conditions</h1>
        <p>Please read these terms carefully before using our services</p>
      </div>

      <div className="content-section">
        <div className="policy-content">
          <div className="policy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using SAM E GLOW's website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
          </div>

          <div className="policy-section">
            <h2>2. User Accounts</h2>
            <p>When creating an account, you must:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be at least 18 years old to make purchases</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. Product Information</h2>
            <p>Please note:</p>
            <ul>
              <li>Product colors may vary slightly from images shown</li>
              <li>We reserve the right to modify product specifications</li>
              <li>Prices are subject to change without notice</li>
              <li>Products are subject to availability</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>4. Payment Terms</h2>
            <p>By making a purchase, you agree that:</p>
            <ul>
              <li>You are authorized to use the payment method</li>
              <li>Charges will be processed at time of purchase</li>
              <li>All payments are non-refundable except as per our Refund Policy</li>
              <li>Prices are in Pakistani Rupees unless stated otherwise</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>5. Intellectual Property</h2>
            <p>All content on this website is protected by:</p>
            <ul>
              <li>Copyright laws</li>
              <li>Trademark rights</li>
              <li>Other intellectual property rights</li>
              <li>May not be used without our written permission</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>6. Limitation of Liability</h2>
            <p>SAM E GLOW shall not be liable for:</p>
            <ul>
              <li>Indirect or consequential damages</li>
              <li>Loss of data or profits</li>
              <li>Service interruptions</li>
              <li>Third-party actions</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Contact Information</h2>
            <p>For questions about these terms, contact us at:</p>
            <p>Email: legal@sameglow.com</p>
            <p>Phone: +92-21-37133288</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 