import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__brand">
          ClipsApp
        </Link>
      </div>

      <nav className="header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `header__nav-item ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => `header__nav-item ${isActive ? 'active' : ''}`}
        >
          Catalog
        </NavLink>
        <button
          type="button"
          className="header__nav-item header__nav-btn"
          onClick={(e) => e.preventDefault()}
        >
          Create Clip
        </button>
      </nav>

      <div className="header__right">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="header__social-link"
          aria-label="Instagram"
        >
          <svg className="header__social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="header__social-link"
          aria-label="YouTube"
        >
          <svg className="header__social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
          </svg>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="header__social-link"
          aria-label="GitHub"
        >
          <svg className="header__social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
