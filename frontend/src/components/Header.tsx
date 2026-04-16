import React from 'react';
import '../App.css';

const Header: React.FC = () => (
  <header>
    <div className="menu-btn" aria-label="Menu Button">
      <div className="btn-line"></div>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
    </div>
    <nav className="menu" aria-label="Main Navigation">
      <div className="menu-branding"><div className="portrait"></div></div>
      <ul className="menu-nav">
        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="/about" className="nav-link">About Me</a></li>
        <li className="nav-item"><a href="/work" className="nav-link">My Work</a></li>
        <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
        <li className="nav-item"><a href="/contact" className="nav-link">How To Reach Me</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
