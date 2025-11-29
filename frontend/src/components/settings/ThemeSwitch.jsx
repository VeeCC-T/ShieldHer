/**
 * ThemeSwitch Component
 * Allows users to toggle between light and dark themes.
 * Theme preference stored locally.
 */

import React from 'react';
import './ThemeSwitch.css';

export const ThemeSwitch = ({ theme, onThemeChange }) => {
  const isDark = theme === 'dark';

  return (
    <div className="theme-switch">
      <div className="theme-switch__header">
        <div className="theme-switch__info">
          <h3 className="theme-switch__title">Theme Preference</h3>
          <p className="theme-switch__description">
            Choose between light and dark mode for comfortable viewing
          </p>
        </div>
      </div>

      <div className="theme-switch__options">
        <button
          onClick={() => onThemeChange('light')}
          className={`theme-switch__option ${!isDark ? 'theme-switch__option--active' : ''}`}
          aria-label="Switch to light theme"
          aria-pressed={!isDark}
        >
          <span className="theme-switch__icon">☀️</span>
          <span className="theme-switch__label">Light</span>
        </button>

        <button
          onClick={() => onThemeChange('dark')}
          className={`theme-switch__option ${isDark ? 'theme-switch__option--active' : ''}`}
          aria-label="Switch to dark theme"
          aria-pressed={isDark}
        >
          <span className="theme-switch__icon">🌙</span>
          <span className="theme-switch__label">Dark</span>
        </button>
      </div>

      <div className="theme-switch__preview">
        <div className={`theme-switch__preview-box theme-switch__preview-box--${theme}`}>
          <div className="theme-switch__preview-header">Preview</div>
          <div className="theme-switch__preview-content">
            <div className="theme-switch__preview-text">Sample text</div>
            <div className="theme-switch__preview-button">Button</div>
          </div>
        </div>
      </div>
    </div>
  );
};
