import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ClipsApp</div>
      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Catalog
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Create Clip
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
