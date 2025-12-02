import React, { createContext, useContext, useState, useEffect } from 'react';

// Ephemeral in-memory encrypted session (simplified placeholder encryption)
const encrypt = (txt) => btoa(unescape(encodeURIComponent(txt)));
const decrypt = (txt) => { try { return decodeURIComponent(escape(atob(txt))); } catch { return ''; } };

const SessionContext = createContext(null);

export const ReportSessionProvider = ({ children }) => {
  const [stage, setStage] = useState('entry'); // entry | form | review | success
  const [reportDraft, setReportDraft] = useState(null);
  const [calmMode, setCalmMode] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Auto-expire after 30 minutes inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 30 * 60 * 1000) {
        clearSession();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [lastActivity]);

  const updateDraft = (draft) => {
    setReportDraft(encrypt(JSON.stringify(draft)));
    setLastActivity(Date.now());
  };

  const getDraft = () => {
    if (!reportDraft) return null;
    try { return JSON.parse(decrypt(reportDraft)); } catch { return null; }
  };

  const clearSession = () => {
    setReportDraft(null);
    setStage('entry');
  };

  return (
    <SessionContext.Provider value={{ stage, setStage, reportDraft: getDraft(), updateDraft, clearSession, calmMode, setCalmMode }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useReportSession = () => useContext(SessionContext);
