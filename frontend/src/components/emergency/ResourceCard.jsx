/**
 * ResourceCard Component
 * Displays resource information with view/read functionality.
 */

import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import './ResourceCard.css';

export const ResourceCard = ({
  title,
  description,
  category,
  resourceType,
  externalUrl,
  tags = [],
  onView
}) => {
  const getCategoryLabel = (cat) => {
    const labels = {
      legal_rights: 'Legal Rights',
      safety_planning: 'Safety Planning',
      organizations: 'Support Organizations',
      laws: 'Laws & Legislation',
      financial: 'Financial Assistance',
      healthcare: 'Healthcare Resources'
    };
    return labels[cat] || cat;
  };

  const getTypeLabel = (type) => {
    const labels = {
      article: 'Article',
      guide: 'Guide',
      directory: 'Directory',
      law: 'Law/Legislation',
      organization: 'Organization'
    };
    return labels[type] || type;
  };

  return (
    <Card className="resource-card">
      <div className="resource-card__header">
        <div className="resource-card__badges">
          <span className={`resource-card__category-badge resource-card__category-badge--${category}`}>
            {getCategoryLabel(category)}
          </span>
          <span className="resource-card__type-badge">
            {getTypeLabel(resourceType)}
          </span>
        </div>
      </div>

      <h3 className="resource-card__title">{title}</h3>

      <p className="resource-card__description">{description}</p>

      {tags && tags.length > 0 && (
        <div className="resource-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="resource-card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="resource-card__actions">
        <Button
          variant="primary"
          onClick={onView}
          className="resource-card__view-button"
          aria-label={`View ${title}`}
        >
          Read More
        </Button>
        {externalUrl && (
          <Button
            variant="secondary"
            onClick={() => window.open(externalUrl, '_blank', 'noopener,noreferrer')}
            className="resource-card__external-button"
            aria-label={`Open external link for ${title}`}
          >
            External Link
          </Button>
        )}
      </div>
    </Card>
  );
};
