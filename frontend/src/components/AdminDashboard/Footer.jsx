import React from 'react';
import { FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

const Footer = () => {
  // Create a mapping object for the links and their corresponding routes
  const linkRoutes = {
    'FAQs': 'faqs',
    'Blogs': 'blogs',
    'Shipping': 'shipment-policy', // Updated to match the route in App.js
    'Terms': 'terms',
    'Refund Policy': 'refund-policy',
    'Privacy Policy': 'privacy-policy'
  };

  return (
    <footer className="admin-footer">
      <div className="footer-main-content">
        <div className="footer-grid-container">
          {/* Contact Us */}
          <div className="footer-section">
            <h3 className="footer-heading" style={{color: 'black', textAlign: 'left', marginLeft: '14%'}}>Contact Us</h3>
            <div className="contact-container">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a 
                  href="mailto:Support@sameglow.com" 
                  className="contact-link"
                >
                  Support@sameglow.com
                </a>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a 
                  href="tel:+92-21-37133288" 
                  className="contact-link"
                >
                  +92-21-37133288
                </a>
              </div>
              <div className="contact-item">
                <FaClock className="contact-icon" />
                <span className="contact-text">10am - 7pm, Mon - Sat</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading footer-heading-center" style={{color: 'black'}}>Quick Links</h3>
            <div className="quick-links-container">
              {Object.entries(linkRoutes).map(([label, route]) => (
                <a 
                  key={label}
                  href={`/${route}`}
                  className="quick-link"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="footer-section">
            <h3 style={{color: 'black', textAlign: 'left', marginLeft: '76%'}}>Follow Us</h3>
            <div className="social-container">
              {[FaInstagram, FaYoutube].map((Icon, index) => (
                <a 
                  key={index}
                  href={index === 0 ? "https://www.instagram.com/sam_e_glowco/profilecard/?igsh=MW9xZHFta2oxanFocA==" : "https://www.youtube.com/@SamraSaleem-v4j"}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="copyright-section">
        <p className="copyright-text">© 2024 SAM E-GlowCo. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;