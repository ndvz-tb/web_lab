import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <span>ClipsApp - Music Clips Management</span>
        <span>© {new Date().getFullYear()} ClipsApp</span>
      </div>
    </footer>
  );
};

export default Footer;
