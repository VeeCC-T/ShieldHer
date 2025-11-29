/**
 * PanicExitToggle Component
 * Allows users to enable/disable panic exit shortcut functionality.
 * Settings stored locally for privacy.
 */

import React from 'react';
import './PanicExitToggle.css';

export const PanicExitToggle = ({ enabled, onToggle, exitUrl }) => {
  return (
    <div className="panic-exit-toggle">
      <div className="panic-exit-toggle__header">
        <div className="panic-exit-toggle__info">
          <h3 className="panic-exit-toggle__title">Panic Exit Shortcut</h3>
          <p className="panic-exit-toggle__description">
            Quickly exit the site by pressing ESC key. Redirects to a safe website.
          </p>
        </div>
        <label className="panic-exit-toggle__switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="panic-exit-toggle__checkbox"
            aria-label="Enable panic exit shortcut"
          />
          <span className="panic-exit-toggle__slider"></span>
        </label>
      </div>

      {enabled && (
        <div className="panic-exit-toggle__details">
          <div className="panic-exit-toggle__shortcut">
            <span className="panic-exit-toggle__key">ESC</span>
            <span className="panic-exit-toggle__arrow">→</span>
            <span className="panic-exit-toggle__url">{exitUrl || 'weather.com'}</span>
          </div>
          <p className="panic-exit-toggle__note">
            ⚠️ This will also clear your browsing history for this site
          </p>
        </div>
      )}
    </div>
  );
};
