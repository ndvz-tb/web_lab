import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = ({ children, onClick, type = 'button', className = '', id }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`secondary-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
