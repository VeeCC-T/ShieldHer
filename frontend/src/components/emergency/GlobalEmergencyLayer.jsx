import React, { useEffect } from 'react';
import './GlobalEmergencyLayer.css';

// Neutral redirect target
const NEUTRAL_URL = 'https://www.weather.com/';

export const GlobalEmergencyLayer = () => {
  // Keyboard shortcut: Shift + Escape triggers quick exit immediately
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && e.shiftKey) {
        quickExit();
      }
    };
    window.addEventListener('keydown', handler, { passive: true });
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const quickExit = () => {
    try {
      // Clear volatile session data
      sessionStorage.clear();
      // Perform very fast redirect
      window.location.replace(NEUTRAL_URL);
    } catch {
      window.location.href = NEUTRAL_URL;
    }
  };

  return (
    <div className="global-emergency-layer" aria-hidden>
      <button
        className="panic-fab"
        onClick={quickExit}
        title="Quick Exit (Shift+Esc)"
        aria-label="Quick Exit"
      >
        Exit
      </button>
    </div>
  );
};
