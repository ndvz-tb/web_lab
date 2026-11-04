import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = ({ children, onClick, type = 'button', className = '', id }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`primary-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
