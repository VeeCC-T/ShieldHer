/**
 * QuickActions Component
 * Quick access to main ShieldHer features
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import './QuickActions.css';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Emergency Help',
      description: 'Access helplines and emergency resources',
      icon: '🆘',
      path: '/emergency/helplines',
      color: 'danger'
    },
    {
      title: 'Learn Digital Skills',
      description: 'Build your digital literacy with interactive lessons',
      icon: '📚',
      path: '/literacy',
      color: 'primary'
    },
    {
      title: 'Anonymous Report',
      description: 'Report incidents safely and anonymously',
      icon: '📝',
      path: '/report',
      color: 'secondary'
    },
    {
      title: 'Safety Settings',
      description: 'Configure your privacy and safety preferences',
      icon: '⚙️',
      path: '/settings',
      color: 'neutral'
    },
    {
      title: 'Chat Support',
      description: 'Get instant help from our support chatbot',
      icon: '💬',
      path: '/emergency/chat',
      color: 'success'
    },
    {
      title: 'Resources',
      description: 'Browse legal rights and support information',
      icon: '📖',
      path: '/emergency/resources',
      color: 'info'
    }
  ];

  return (
    <div className="quick-actions">
      <div className="quick-actions__grid">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="quick-actions__link"
            aria-label={`${action.title}: ${action.description}`}
          >
            <Card className={`quick-actions__card quick-actions__card--${action.color}`}>
              <div className="quick-actions__icon">{action.icon}</div>
              <h3 className="quick-actions__title">{action.title}</h3>
              <p className="quick-actions__description">{action.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
