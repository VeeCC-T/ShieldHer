/**
 * Bottom Navigation Bar
 * Mobile-first navigation for ShieldHer
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

export const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/literacy', label: 'Learn', icon: '📚' },
    { path: '/emergency', label: 'Help', icon: '🆘' },
    { path: '/report', label: 'Report', icon: '📝' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__container">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav__link ${
              location.pathname === item.path ? 'bottom-nav__link--active' : ''
            }`}
            aria-label={`Navigate to ${item.label}`}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            <span className="bottom-nav__label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
