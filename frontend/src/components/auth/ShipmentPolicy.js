import React from 'react';
import './auth.css';

const ShipmentPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Shipment Policy</h1>
        <p>Information about our shipping services and delivery process</p>
      </div>

      <div className="content-section">
        <div className="policy-content">
          <div className="policy-section">
            <h2>Shipping Methods</h2>
            <p>We offer the following shipping options:</p>
            <ul>
              <li>Standard Delivery (3-5 business days)</li>
              <li>Express Delivery (1-2 business days)</li>
              <li>International Shipping (7-14 business days)</li>
              <li>Free shipping on orders above Rs. 5000</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Processing Time</h2>
            <p>Order processing and handling:</p>
            <ul>
              <li>Orders are processed within 24-48 hours</li>
              <li>Orders placed on weekends will be processed next business day</li>
              <li>You will receive tracking information via email</li>
              <li>Track your order through our website or courier partner</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Shipping Restrictions</h2>
            <p>Please note the following restrictions:</p>
            <ul>
              <li>Some items may not be eligible for international shipping</li>
              <li>Certain remote areas may have extended delivery times</li>
              <li>Additional customs fees may apply for international orders</li>
              <li>PO Box addresses are not accepted</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Delivery Information</h2>
            <p>Important delivery details:</p>
            <ul>
              <li>Signature may be required upon delivery</li>
              <li>Please provide accurate shipping information</li>
              <li>Contact us within 48 hours for delivery issues</li>
              <li>We are not responsible for incorrect addresses provided</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Shipping Rates</h2>
            <table className="shipping-rates">
              <thead>
                <tr>
                  <th>Delivery Type</th>
                  <th>Duration</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Standard Delivery</strong></td>
                  <td>3-5 business days</td>
                  <td>Rs. 200</td>
                </tr>
                <tr>
                  <td><strong>Express Delivery</strong></td>
                  <td>1-2 business days</td>
                  <td>Rs. 500</td>
                </tr>
                <tr>
                  <td><strong>International</strong></td>
                  <td>7-14 business days</td>
                  <td>Varies by location</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentPolicy; 