import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Get in Touch with Us</h3>
          <p>Email: <a href="mailto:info@liftmedia.com">info@liftmedia.com</a></p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/book-service">Book a Service</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/cookies">Cookies</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.</p>
        </div>
        <div className="footer-section">
          <h3>Business Login</h3>
          <a href="/business-login" className="business-login-btn">Business Login</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
