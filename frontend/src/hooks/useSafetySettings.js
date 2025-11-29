/**
 * Custom hook for managing safety settings.
 * All settings stored locally for privacy - NO server storage.
 */

import { useState, useEffect, useCallback } from 'react';

const SETTINGS_KEY = 'shieldher_safety_settings';

const DEFAULT_SETTINGS = {
  panicExit: {
    enabled: false,
    exitUrl: 'https://weather.com'
  },
  notifications: {
    lessons: true,
    resources: true,
    helplines: true,
    safety: true
  },
  theme: 'light'
};

export const useSafetySettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  }, []);

  // Update panic exit settings
  const updatePanicExit = useCallback((enabled, exitUrl) => {
    const newSettings = {
      ...settings,
      panicExit: {
        enabled,
        exitUrl: exitUrl || settings.panicExit.exitUrl
      }
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Update notification preference
  const updateNotification = useCallback((type, enabled) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: enabled
      }
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Update theme
  const updateTheme = useCallback((theme) => {
    const newSettings = {
      ...settings,
      theme
    };
    saveSettings(newSettings);

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [settings, saveSettings]);

  // Apply theme on load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Setup panic exit listener
  useEffect(() => {
    if (!settings.panicExit.enabled) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        // Clear history
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', settings.panicExit.exitUrl);
        }
        // Redirect
        window.location.replace(settings.panicExit.exitUrl);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [settings.panicExit]);

  return {
    settings,
    loading,
    updatePanicExit,
    updateNotification,
    updateTheme
  };
};
