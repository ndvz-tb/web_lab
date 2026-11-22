import React from 'react';
import './Loader.css';

const Loader = ({ text = 'Завантаження...' }) => {
  return (
    <div className="loader-wrapper" role="status" aria-live="polite">
      <div className="loader-spinner" />
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
};

export default Loader;
