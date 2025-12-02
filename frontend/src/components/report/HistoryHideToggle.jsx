/**
 * HistoryHideToggle component
 * Enables/disables history hiding mode
 * When enabled, prevents browser history tracking
 */

import React, { useState, useEffect } from 'react';
import './HistoryHideToggle.css';

const HistoryHideToggle = () => {
  const [hideHistory, setHideHistory] = useState(false);

  useEffect(() => {
    // Check if history hiding is enabled
    const isEnabled = sessionStorage.getItem('hideHistory') === 'true';
    setHideHistory(isEnabled);
  }, []);

  const toggleHistoryHiding = () => {
    const newValue = !hideHistory;
    setHideHistory(newValue);
    
    if (newValue) {
      // Enable history hiding
      sessionStorage.setItem('hideHistory', 'true');
      
      // Replace current history entry with neutral page
      window.history.replaceState(null, '', '/');
      
      // Disable back button by replacing history
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', preventBack);
    } else {
      // Disable history hiding
      sessionStorage.removeItem('hideHistory');
      window.removeEventListener('popstate', preventBack);
    }
  };

  const preventBack = () => {
    window.history.pushState(null, '', window.location.href);
  };

  return (
    <div className="history-hide-toggle">
      <label className="history-hide-toggle__label">
        <input
          type="checkbox"
          checked={hideHistory}
          onChange={toggleHistoryHiding}
          className="history-hide-toggle__checkbox"
        />
        <span className="history-hide-toggle__text">
          <strong>Hide from browser history</strong>
          <span className="history-hide-toggle__description">
            Prevents this page from appearing in your browser history
          </span>
        </span>
      </label>
      {hideHistory && (
        <div className="history-hide-toggle__notice">
          <svg className="history-hide-toggle__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History hiding is active
        </div>
      )}
    </div>
  );
};

export { HistoryHideToggle };
export default HistoryHideToggle;
