import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">ClipsApp</span>
          <span className="footer-desc">
            Music Clips Management & Catalog Application
          </span>
        </div>
        <nav className="footer-nav">
          <a href="#view-clips" className="footer-link">View Clips</a>
          <a href="#create-clip" className="footer-link">Create Clip</a>
        </nav>
        <div className="footer-copyright">
          © {new Date().getFullYear()} ClipsApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
