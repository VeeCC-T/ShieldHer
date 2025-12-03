import React from 'react';
import { useReportSession } from './sessionContext';
import './ClearHistoryButton.css';

const ClearHistoryButton = ({ onCleared }) => {
  const { clearSession } = useReportSession();
  const handle = () => {
    if (window.confirm('Clear and return to start? This cannot be undone.')) {
      clearSession();
      onCleared && onCleared();
    }
  };
  return (
    <button type="button" className="clear-history-btn" onClick={handle} aria-label="Clear report data">
      Clear session
    </button>
  );
};

export default ClearHistoryButton;
