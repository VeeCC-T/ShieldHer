/**
 * ProgressBadge Component
 * Display user achievements and badges
 */

import React from 'react';
import './ProgressBadge.css';

const BADGE_INFO = {
  'first-step': {
    name: 'First Step',
    description: 'Completed your first lesson',
    icon: '🌟',
    color: '#8b5cf6',
  },
  'dedicated-learner': {
    name: 'Dedicated Learner',
    description: 'Completed 5 lessons',
    icon: '📚',
    color: '#f43f5e',
  },
  'digital-guardian': {
    name: 'Digital Guardian',
    description: 'Completed all lessons',
    icon: '🛡️',
    color: '#14b8a6',
  },
  'perfectionist': {
    name: 'Perfectionist',
    description: 'Scored 100% on 3 quizzes',
    icon: '💯',
    color: '#f59e0b',
  },
  'committed': {
    name: 'Committed',
    description: '7-day learning streak',
    icon: '🔥',
    color: '#ef4444',
  },
  'point-master': {
    name: 'Point Master',
    description: 'Earned 1000+ points',
    icon: '⭐',
    color: '#3b82f6',
  },
};

export const ProgressBadge = ({ badgeId, size = 'md', showDetails = false, locked = false }) => {
  const badge = BADGE_INFO[badgeId];
  
  if (!badge) return null;

  const sizeClasses = {
    sm: 'progress-badge--sm',
    md: 'progress-badge--md',
    lg: 'progress-badge--lg',
    xl: 'progress-badge--xl',
  };

  return (
    <div 
      className={`progress-badge ${sizeClasses[size]} ${locked ? 'progress-badge--locked' : ''}`}
      title={locked ? `${badge.name} (Locked)` : badge.name}
      style={{ '--badge-color': badge.color }}
    >
      <div className="progress-badge__icon" aria-label={badge.name}>
        {locked ? '🔒' : badge.icon}
      </div>
      {showDetails && (
        <div className="progress-badge__details">
          <h4 className="progress-badge__name">{badge.name}</h4>
          <p className="progress-badge__description">{badge.description}</p>
        </div>
      )}
    </div>
  );
};

export const BadgeCollection = ({ badges, allBadgeIds }) => {
  return (
    <div className="badge-collection">
      <h3 className="badge-collection__title">Your Badges</h3>
      <div className="badge-collection__grid">
        {allBadgeIds.map((badgeId) => (
          <ProgressBadge
            key={badgeId}
            badgeId={badgeId}
            locked={!badges.includes(badgeId)}
            showDetails={true}
            size="lg"
          />
        ))}
      </div>
    </div>
  );
};

export const ProgressStats = ({ achievements }) => {
  return (
    <div className="progress-stats">
      <div className="progress-stats__item">
        <span className="progress-stats__icon">🎓</span>
        <div className="progress-stats__content">
          <p className="progress-stats__label">Lessons Completed</p>
          <p className="progress-stats__value">{achievements.completedLessons || 0}</p>
        </div>
      </div>

      <div className="progress-stats__item">
        <span className="progress-stats__icon">🏆</span>
        <div className="progress-stats__content">
          <p className="progress-stats__label">Badges Earned</p>
          <p className="progress-stats__value">{achievements.badges?.length || 0}</p>
        </div>
      </div>

      <div className="progress-stats__item">
        <span className="progress-stats__icon">🔥</span>
        <div className="progress-stats__content">
          <p className="progress-stats__label">Day Streak</p>
          <p className="progress-stats__value">{achievements.streak || 0}</p>
        </div>
      </div>

      <div className="progress-stats__item">
        <span className="progress-stats__icon">⭐</span>
        <div className="progress-stats__content">
          <p className="progress-stats__label">Total Points</p>
          <p className="progress-stats__value">{achievements.totalPoints || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBadge;
