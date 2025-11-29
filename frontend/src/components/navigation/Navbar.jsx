/**
 * Navbar Component
 * Global navigation bar for desktop and tablet views.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">💜</span>
          <span className="navbar__title">ShieldHer</span>
        </Link>

        <div className="navbar__links">
          <Link
            to="/"
            className={`navbar__link ${isActive('/') && location.pathname === '/' ? 'navbar__link--active' : ''}`}
            aria-current={isActive('/') && location.pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            to="/lessons"
            className={`navbar__link ${isActive('/lessons') ? 'navbar__link--active' : ''}`}
            aria-current={isActive('/lessons') ? 'page' : undefined}
          >
            Learn
          </Link>
          <Link
            to="/emergency/helplines"
            className={`navbar__link ${isActive('/emergency') ? 'navbar__link--active' : ''}`}
            aria-current={isActive('/emergency') ? 'page' : undefined}
          >
            Emergency
          </Link>
          <Link
            to="/report"
            className={`navbar__link ${isActive('/report') ? 'navbar__link--active' : ''}`}
            aria-current={isActive('/report') ? 'page' : undefined}
          >
            Report
          </Link>
          <Link
            to="/settings/safety"
            className={`navbar__link ${isActive('/settings') ? 'navbar__link--active' : ''}`}
            aria-current={isActive('/settings') ? 'page' : undefined}
          >
            Settings
          </Link>
        </div>

        <div className="navbar__emergency">
          <a
            href="tel:1-800-799-7233"
            className="navbar__emergency-button"
            aria-label="Call National Domestic Violence Hotline"
          >
            <span className="navbar__emergency-icon">📞</span>
            <span className="navbar__emergency-text">Emergency: 1-800-799-7233</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
