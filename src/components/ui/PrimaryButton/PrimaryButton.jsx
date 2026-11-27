import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = ({
  children,
  onClick,
  type = 'button',
  className = '',
  id,
  disabled = false
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`primary-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
