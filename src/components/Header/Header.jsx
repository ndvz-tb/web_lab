import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ClipsApp</div>
      <nav className="nav">
        <a href="#view-clips" className="active">View Clips</a>
        <a href="#create-clip">Create Clip</a>
      </nav>
    </header>
  );
};

export default Header;
