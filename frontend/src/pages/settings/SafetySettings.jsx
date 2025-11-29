/**
 * SafetySettings Page
 * Central hub for all safety and privacy settings.
 * All settings stored locally - NO server storage for privacy.
 */

import React from 'react';
import { useSafetySettings } from '../../hooks/useSafetySettings';
import { PanicExitToggle } from '../../components/settings/PanicExitToggle';
import { NotificationToggle } from '../../components/settings/NotificationToggle';
import { ThemeSwitch } from '../../components/settings/ThemeSwitch';
import { PrivacyGuide } from '../../components/settings/PrivacyGuide';
import './SafetySettings.css';

export const SafetySettings = () => {
  const {
    settings,
    loading,
    updatePanicExit,
    updateNotification,
    updateTheme
  } = useSafetySettings();

  if (loading) {
    return (
      <div className="safety-settings">
        <div className="safety-settings__container">
          <div className="safety-settings__loading">
            <div className="safety-settings__spinner"></div>
            <p>Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="safety-settings">
      <div className="safety-settings__container">
        <header className="safety-settings__header">
          <h1 className="safety-settings__title">Safety Settings</h1>
          <p className="safety-settings__description">
            Customize your safety preferences. All settings are stored locally on your device for privacy.
          </p>
          <div className="safety-settings__privacy-badge">
            <span className="safety-settings__privacy-icon">🔒</span>
            <span>No data sent to servers</span>
          </div>
        </header>

        <div className="safety-settings__content">
          <section className="safety-settings__section">
            <h2 className="safety-settings__section-title">Emergency Features</h2>
            <PanicExitToggle
              enabled={settings.panicExit.enabled}
              exitUrl={settings.panicExit.exitUrl}
              onToggle={(enabled) => updatePanicExit(enabled)}
            />
          </section>

          <section className="safety-settings__section">
            <h2 className="safety-settings__section-title">Appearance</h2>
            <ThemeSwitch
              theme={settings.theme}
              onThemeChange={updateTheme}
            />
          </section>

          <section className="safety-settings__section">
            <h2 className="safety-settings__section-title">Notifications</h2>
            <NotificationToggle
              preferences={settings.notifications}
              onToggle={updateNotification}
            />
          </section>

          <section className="safety-settings__section safety-settings__section--full">
            <h2 className="safety-settings__section-title">Safety & Privacy Guides</h2>
            <PrivacyGuide />
          </section>
        </div>

        <footer className="safety-settings__footer">
          <div className="safety-settings__footer-content">
            <h3 className="safety-settings__footer-title">Need Help?</h3>
            <p className="safety-settings__footer-text">
              If you're in immediate danger, call 911 or the National Domestic Violence Hotline at 1-800-799-7233 (24/7).
            </p>
            <div className="safety-settings__footer-links">
              <a href="/emergency/helplines" className="safety-settings__footer-link">
                View Emergency Helplines
              </a>
              <a href="/emergency/resources" className="safety-settings__footer-link">
                Browse Resources
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
