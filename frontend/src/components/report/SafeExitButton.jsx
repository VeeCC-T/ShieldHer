/**
 * SafeExitButton component
 * PANIC EXIT - Instantly redirects to neutral page
 * CRITICAL SAFETY FEATURE for users in danger
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SafeExitButton.css';

const SafeExitButton = ({ position = 'fixed' }) => {
  const navigate = useNavigate();

  const handleSafeExit = () => {
    // IMMEDIATE redirect to neutral page (weather site)
    window.location.replace('https://www.weather.com');
    
    // Clear any sensitive data from memory
    sessionStorage.clear();
    
    // If history hiding is not enabled, try to clear recent history
    // Note: This is limited by browser security, but we try
    if (window.history.length > 1) {
      window.history.go(-(window.history.length - 1));
    }
  };

  return (
    <button
      className={`safe-exit safe-exit--${position}`}
      onClick={handleSafeExit}
      aria-label="Quick exit to safe page"
      title="Quick exit - leaves this site immediately"
    >
      <svg
        className="safe-exit__icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="safe-exit__text">Quick Exit</span>
    </button>
  );
};

SafeExitButton.propTypes = {
  position: PropTypes.oneOf(['fixed', 'static']),
};

export { SafeExitButton };
export default SafeExitButton;
