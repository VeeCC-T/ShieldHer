/**
 * NotificationToggle Component
 * Manages notification preferences for different types of alerts.
 * Settings stored locally for privacy.
 */

import React from 'react';
import './NotificationToggle.css';

export const NotificationToggle = ({ preferences, onToggle }) => {
  const notificationTypes = [
    {
      id: 'lessons',
      label: 'New Lessons',
      description: 'Get notified when new digital literacy lessons are available'
    },
    {
      id: 'resources',
      label: 'Resource Updates',
      description: 'Updates to legal rights and support resources'
    },
    {
      id: 'helplines',
      label: 'Helpline Changes',
      description: 'Changes to emergency helpline information'
    },
    {
      id: 'safety',
      label: 'Safety Alerts',
      description: 'Important safety and security updates'
    }
  ];

  return (
    <div className="notification-toggle">
      <div className="notification-toggle__header">
        <h3 className="notification-toggle__title">Notification Preferences</h3>
        <p className="notification-toggle__description">
          Choose which notifications you'd like to receive. All settings are stored locally.
        </p>
      </div>

      <div className="notification-toggle__list">
        {notificationTypes.map((type) => (
          <div key={type.id} className="notification-toggle__item">
            <div className="notification-toggle__item-info">
              <h4 className="notification-toggle__item-label">{type.label}</h4>
              <p className="notification-toggle__item-description">{type.description}</p>
            </div>
            <label className="notification-toggle__switch">
              <input
                type="checkbox"
                checked={preferences[type.id] || false}
                onChange={(e) => onToggle(type.id, e.target.checked)}
                className="notification-toggle__checkbox"
                aria-label={`Enable ${type.label} notifications`}
              />
              <span className="notification-toggle__slider"></span>
            </label>
          </div>
        ))}
      </div>

      <div className="notification-toggle__note">
        <p>
          💡 Notifications are browser-based and require permission. No personal data is collected.
        </p>
      </div>
    </div>
  );
};
