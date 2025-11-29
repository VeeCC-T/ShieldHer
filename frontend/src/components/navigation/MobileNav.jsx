/**
 * MobileNav Component
 * Bottom navigation bar for mobile devices.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileNav.css';

export const MobileNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
      <Link
        to="/"
        className={`mobile-nav__item ${isActive('/') && location.pathname === '/' ? 'mobile-nav__item--active' : ''}`}
        aria-label="Home"
        aria-current={isActive('/') && location.pathname === '/' ? 'page' : undefined}
      >
        <span className="mobile-nav__icon">🏠</span>
        <span className="mobile-nav__label">Home</span>
      </Link>

      <Link
        to="/lessons"
        className={`mobile-nav__item ${isActive('/lessons') ? 'mobile-nav__item--active' : ''}`}
        aria-label="Learn"
        aria-current={isActive('/lessons') ? 'page' : undefined}
      >
        <span className="mobile-nav__icon">📚</span>
        <span className="mobile-nav__label">Learn</span>
      </Link>

      <Link
        to="/emergency/helplines"
        className={`mobile-nav__item ${isActive('/emergency') ? 'mobile-nav__item--active' : ''}`}
        aria-label="Emergency"
        aria-current={isActive('/emergency') ? 'page' : undefined}
      >
        <span className="mobile-nav__icon">🆘</span>
        <span className="mobile-nav__label">Emergency</span>
      </Link>

      <Link
        to="/report"
        className={`mobile-nav__item ${isActive('/report') ? 'mobile-nav__item--active' : ''}`}
        aria-label="Report"
        aria-current={isActive('/report') ? 'page' : undefined}
      >
        <span className="mobile-nav__icon">📝</span>
        <span className="mobile-nav__label">Report</span>
      </Link>

      <Link
        to="/settings/safety"
        className={`mobile-nav__item ${isActive('/settings') ? 'mobile-nav__item--active' : ''}`}
        aria-label="Settings"
        aria-current={isActive('/settings') ? 'page' : undefined}
      >
        <span className="mobile-nav__icon">⚙️</span>
        <span className="mobile-nav__label">Settings</span>
      </Link>
    </nav>
  );
};
