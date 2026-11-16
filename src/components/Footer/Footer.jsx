import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">ClipsApp</div>
        <p className="footer__desc">
          Платформа для перегляду, пошуку та організації культових музичних відеокліпів.
        </p>
        <div className="footer__copy">
          © {new Date().getFullYear()} ClipsApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
