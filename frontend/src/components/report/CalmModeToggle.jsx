import React from 'react';
import { useReportSession } from './sessionContext';

const CalmModeToggle = () => {
  const { calmMode, setCalmMode } = useReportSession();
  const toggle = () => setCalmMode(m => !m);
  return (
    <button type="button" onClick={toggle} className="calm-mode-toggle" aria-pressed={calmMode} title="Toggle calm mode">
      {calmMode ? 'Calm Mode On' : 'Calm Mode'}
    </button>
  );
};

export default CalmModeToggle;
