import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Ephemeral in-memory encrypted session using Web Crypto API (AES-GCM)
// The encryption key is generated per session and stored only in memory.
// This provides actual encryption for sensitive report data during the session.

const generateKey = () => {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    false, // not extractable
    ['encrypt', 'decrypt']
  );
};

const encryptData = async (key, plaintext) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  // Combine IV and ciphertext for storage
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);
  // Convert to base64 for storage as string
  return btoa(String.fromCharCode(...combined));
};

const decryptData = async (key, encryptedData) => {
  try {
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    // Extract IV and ciphertext
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch {
    return '';
  }
};

const SessionContext = createContext(null);

export const ReportSessionProvider = ({ children }) => {
  const [stage, setStage] = useState('entry'); // entry | form | review | success
  const [reportDraft, setReportDraft] = useState(null);
  const [decryptedDraft, setDecryptedDraft] = useState(null);
  const [calmMode, setCalmMode] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const encryptionKeyRef = useRef(null);
  const keyGenerationPromiseRef = useRef(null);

  // Initialize encryption key on mount
  useEffect(() => {
    keyGenerationPromiseRef.current = generateKey().then(key => {
      encryptionKeyRef.current = key;
      return key;
    });
  }, []);

  // Auto-expire after 30 minutes inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 30 * 60 * 1000) {
        clearSession();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [lastActivity]);

  // Decrypt draft when reportDraft changes
  useEffect(() => {
    let cancelled = false;
    const decryptDraft = async () => {
      if (!reportDraft || !encryptionKeyRef.current) {
        setDecryptedDraft(null);
        return;
      }
      try {
        const decrypted = await decryptData(encryptionKeyRef.current, reportDraft);
        if (!cancelled) {
          setDecryptedDraft(JSON.parse(decrypted));
        }
      } catch {
        if (!cancelled) {
          setDecryptedDraft(null);
        }
      }
    };
    decryptDraft();
    return () => { cancelled = true; };
  }, [reportDraft]);

  const updateDraft = async (draft) => {
    // Wait for initial key generation if still in progress
    if (!encryptionKeyRef.current && keyGenerationPromiseRef.current) {
      await keyGenerationPromiseRef.current;
    }
    // Fallback key generation (shouldn't normally happen)
    if (!encryptionKeyRef.current) {
      encryptionKeyRef.current = await generateKey();
    }
    const encrypted = await encryptData(encryptionKeyRef.current, JSON.stringify(draft));
    setReportDraft(encrypted);
    setDecryptedDraft(draft);
    setLastActivity(Date.now());
  };

  const clearSession = () => {
    setReportDraft(null);
    setDecryptedDraft(null);
    setStage('entry');
  };

  return (
    <SessionContext.Provider value={{ stage, setStage, reportDraft: decryptedDraft, updateDraft, clearSession, calmMode, setCalmMode }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useReportSession = () => useContext(SessionContext);
