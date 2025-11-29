/**
 * Resources Page
 * Displays searchable directory of educational resources.
 */

import React, { useState } from 'react';
import { useResources, useResource } from '../../hooks/useResources';
import { ResourceCard } from '../../components/emergency/ResourceCard';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import './Resources.css';

export const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  
  const { resources, loading, error } = useResources(searchQuery, selectedCategory);
  const { resource: selectedResource, loading: resourceLoading } = useResource(selectedResourceId);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'legal_rights', label: 'Legal Rights' },
    { value: 'safety_planning', label: 'Safety Planning' },
    { value: 'organizations', label: 'Support Organizations' },
    { value: 'laws', label: 'Laws & Legislation' },
    { value: 'financial', label: 'Financial Assistance' },
    { value: 'healthcare', label: 'Healthcare Resources' }
  ];

  const handleViewResource = (resourceId) => {
    setSelectedResourceId(resourceId);
  };

  const handleCloseResource = () => {
    setSelectedResourceId(null);
  };

  return (
    <div className="resources-page">
      <div className="resources-page__container">
        <header className="resources-page__header">
          <h1 className="resources-page__title">Resources & Information</h1>
          <p className="resources-page__description">
            Access comprehensive information about your rights, safety planning, and support organizations.
          </p>
        </header>

        <div className="resources-page__filters">
          <div className="resources-page__search">
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search resources"
            />
          </div>

          <div className="resources-page__category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`resources-page__category-tab ${
                  selectedCategory === cat.value ? 'resources-page__category-tab--active' : ''
                }`}
                aria-label={`Filter by ${cat.label}`}
                aria-pressed={selectedCategory === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="resources-page__loading">
            <div className="resources-page__spinner"></div>
            <p>Loading resources...</p>
          </div>
        )}

        {error && (
          <div className="resources-page__error" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!loading && resources.length === 0 && (
          <div className="resources-page__empty">
            <p>No resources found. Try adjusting your search or filters.</p>
          </div>
        )}

        {!loading && resources.length > 0 && (
          <div className="resources-page__results">
            <p className="resources-page__results-count">
              {resources.length} resource{resources.length !== 1 ? 's' : ''} found
            </p>
            
            <div className="resources-page__grid">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  resourceType={resource.resource_type}
                  externalUrl={resource.external_url}
                  tags={resource.tags}
                  onView={() => handleViewResource(resource.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Resource Detail Modal */}
        {selectedResourceId && (
          <div className="resources-page__modal" role="dialog" aria-modal="true">
            <div className="resources-page__modal-overlay" onClick={handleCloseResource}></div>
            <div className="resources-page__modal-content">
              {resourceLoading ? (
                <div className="resources-page__modal-loading">
                  <div className="resources-page__spinner"></div>
                  <p>Loading resource...</p>
                </div>
              ) : selectedResource ? (
                <>
                  <button
                    onClick={handleCloseResource}
                    className="resources-page__modal-close"
                    aria-label="Close resource"
                  >
                    ✕
                  </button>
                  
                  <h2 className="resources-page__modal-title">{selectedResource.title}</h2>
                  
                  <div className="resources-page__modal-meta">
                    <span className="resources-page__modal-badge">
                      {selectedResource.category}
                    </span>
                    <span className="resources-page__modal-badge">
                      {selectedResource.resource_type}
                    </span>
                  </div>

                  <div className="resources-page__modal-body">
                    <p className="resources-page__modal-description">
                      {selectedResource.description}
                    </p>
                    
                    <div className="resources-page__modal-content-text">
                      {selectedResource.content}
                    </div>

                    {selectedResource.external_url && (
                      <div className="resources-page__modal-actions">
                        <Button
                          variant="primary"
                          onClick={() => window.open(selectedResource.external_url, '_blank', 'noopener,noreferrer')}
                        >
                          Visit External Link
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
