/**
 * HelplineCard Component
 * Displays helpline information with click-to-call functionality.
 */

import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import './HelplineCard.css';

export const HelplineCard = ({
  name,
  phoneNumber,
  description,
  availability,
  is247,
  category,
  languages = [],
  onCall
}) => {
  const handleCall = () => {
    if (onCall) {
      onCall(phoneNumber);
    } else {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      crisis: 'Crisis Support',
      legal: 'Legal Assistance',
      counseling: 'Counseling',
      shelter: 'Shelter/Housing',
      medical: 'Medical Services',
      other: 'Other Support'
    };
    return labels[cat] || cat;
  };

  return (
    <Card className="helpline-card">
      <div className="helpline-card__header">
        <h3 className="helpline-card__title">{name}</h3>
        {is247 && (
          <span className="helpline-card__badge helpline-card__badge--24-7">
            24/7
          </span>
        )}
      </div>

      <div className="helpline-card__category">
        <span className={`helpline-card__category-badge helpline-card__category-badge--${category}`}>
          {getCategoryLabel(category)}
        </span>
      </div>

      <p className="helpline-card__description">{description}</p>

      <div className="helpline-card__details">
        <div className="helpline-card__detail">
          <span className="helpline-card__detail-label">Availability:</span>
          <span className="helpline-card__detail-value">{availability}</span>
        </div>

        {languages && languages.length > 0 && (
          <div className="helpline-card__detail">
            <span className="helpline-card__detail-label">Languages:</span>
            <span className="helpline-card__detail-value">
              {languages.join(', ')}
            </span>
          </div>
        )}
      </div>

      <div className="helpline-card__actions">
        <Button
          variant="primary"
          size="large"
          onClick={handleCall}
          className="helpline-card__call-button"
          aria-label={`Call ${name} at ${phoneNumber}`}
        >
          <span className="helpline-card__phone-icon" aria-hidden="true">📞</span>
          Call {phoneNumber}
        </Button>
      </div>
    </Card>
  );
};
