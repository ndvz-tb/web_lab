import React from 'react';
import './Select.css';

const Select = ({ id, name, label, options = [], value, onChange }) => {
  return (
    <div className="select-group">
      {label && (
        <label htmlFor={id} className="select-label">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="select-control"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
