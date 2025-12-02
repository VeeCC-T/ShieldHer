/**
 * LoadingSpinner Component
 * Accessible loading indicator with customizable size and color
 */

import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  label = 'Loading...',
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'loading-spinner--sm',
    md: 'loading-spinner--md',
    lg: 'loading-spinner--lg',
    xl: 'loading-spinner--xl',
  };

  const colorClasses = {
    primary: 'loading-spinner--primary',
    secondary: 'loading-spinner--secondary',
    white: 'loading-spinner--white',
  };

  const spinner = (
    <div className="loading-spinner__wrapper" role="status" aria-live="polite">
      <div 
        className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-label={label}
      >
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
      </div>
      <span className="loading-spinner__label">{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-spinner__fullscreen">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
