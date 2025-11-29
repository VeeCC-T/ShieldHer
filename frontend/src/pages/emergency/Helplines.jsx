/**
 * Helplines Page
 * Displays searchable directory of emergency helplines with offline support.
 */

import React, { useState } from 'react';
import { useHelplines } from '../../hooks/useHelplines';
import { useOfflineCache } from '../../hooks/useOfflineCache';
import { HelplineCard } from '../../components/emergency/HelplineCard';
import { Input } from '../../components/common/Input';
import './Helplines.css';

export const Helplines = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { helplines, loading, error, isOffline } = useHelplines(searchQuery, selectedCategory);
  const { isOnline } = useOfflineCache();

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'crisis', label: 'Crisis Support' },
    { value: 'legal', label: 'Legal Assistance' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'shelter', label: 'Shelter/Housing' },
    { value: 'medical', label: 'Medical Services' },
    { value: 'other', label: 'Other Support' }
  ];

  return (
    <div className="helplines-page">
      <div className="helplines-page__container">
        <header className="helplines-page__header">
          <h1 className="helplines-page__title">Emergency Helplines</h1>
          <p className="helplines-page__description">
            24/7 support is available. If you're in immediate danger, call 911.
          </p>
          
          {!isOnline && (
            <div className="helplines-page__offline-banner" role="alert">
              <span className="helplines-page__offline-icon">📵</span>
              <span>You're offline. Showing cached helplines.</span>
            </div>
          )}
        </header>

        <div className="helplines-page__filters">
          <div className="helplines-page__search">
            <Input
              type="search"
              placeholder="Search helplines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search helplines"
            />
          </div>

          <div className="helplines-page__category-filter">
            <label htmlFor="category-select" className="helplines-page__filter-label">
              Filter by category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="helplines-page__select"
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="helplines-page__loading">
            <div className="helplines-page__spinner"></div>
            <p>Loading helplines...</p>
          </div>
        )}

        {error && !isOffline && (
          <div className="helplines-page__error" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!loading && helplines.length === 0 && (
          <div className="helplines-page__empty">
            <p>No helplines found. Try adjusting your search or filters.</p>
          </div>
        )}

        {!loading && helplines.length > 0 && (
          <div className="helplines-page__results">
            <p className="helplines-page__results-count">
              {helplines.length} helpline{helplines.length !== 1 ? 's' : ''} found
            </p>
            
            <div className="helplines-page__grid">
              {helplines.map((helpline) => (
                <HelplineCard
                  key={helpline.id}
                  name={helpline.name}
                  phoneNumber={helpline.phone_number}
                  description={helpline.description}
                  availability={helpline.availability}
                  is247={helpline.is_24_7}
                  category={helpline.category}
                  languages={helpline.languages}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
