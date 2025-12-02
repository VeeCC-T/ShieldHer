/**
 * Toast Notification Component
 * Accessible toast notifications for feedback
 */

import React, { useEffect } from 'react';
import './Toast.css';

export const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  action,
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div 
      className={`toast toast--${type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast__content">
        <span className="toast__icon" aria-hidden="true">
          {icons[type]}
        </span>
        <p className="toast__message">{message}</p>
      </div>
      
      <div className="toast__actions">
        {action && (
          <button
            onClick={action.onClick}
            className="toast__action-button"
            aria-label={action.label}
          >
            {action.label}
          </button>
        )}
        <button
          onClick={onClose}
          className="toast__close"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          action={toast.action}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
