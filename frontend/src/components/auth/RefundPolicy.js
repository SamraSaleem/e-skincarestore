import React from 'react';
import './auth.css';

const RefundPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Return & Refund Policy</h1>
        <p>Our commitment to your satisfaction</p>
      </div>

      <div className="content-section">
        <div className="policy-content">
          <div className="policy-section">
            <h2>Return Policy</h2>
            <p>We accept returns within 30 days of purchase under the following conditions:</p>
            <ul>
              <li>Product must be unused and in original packaging</li>
              <li>Proof of purchase is required</li>
              <li>Product must not be opened for hygiene reasons</li>
              <li>Return shipping costs are the responsibility of the customer</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Refund Process</h2>
            <p>Once we receive your return:</p>
            <ul>
              <li>We will inspect the product within 48 hours</li>
              <li>Approved refunds will be processed within 5-7 business days</li>
              <li>Refund will be issued to the original payment method</li>
              <li>You will receive an email confirmation of the refund</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Non-Returnable Items</h2>
            <p>The following items cannot be returned:</p>
            <ul>
              <li>Opened or used products</li>
              <li>Products without original packaging</li>
              <li>Sale items marked as final sale</li>
              <li>Gift cards</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Damaged or Defective Items</h2>
            <p>For damaged or defective items:</p>
            <ul>
              <li>Contact us within 48 hours of receiving the product</li>
              <li>Provide photos of the damaged product</li>
              <li>We will arrange for return shipping at our cost</li>
              <li>Replacement or refund will be processed immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy; 