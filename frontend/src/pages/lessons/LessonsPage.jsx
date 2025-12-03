/**
 * LessonsPage - Digital Literacy Module
 * Implemented by Person B
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLessons, useCategories } from '../../hooks/useLessons';
import { LessonCard } from '../../components/literacy/LessonCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import './LessonsPage.css';

export const LessonsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  
  const { lessons, loading, error } = useLessons({ 
    search: searchQuery, 
    category: selectedCategory,
    difficulty: selectedDifficulty 
  });
  const { categories } = useCategories();

  const handleLessonClick = (lessonId) => {
    navigate(`/literacy/lesson/${lessonId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedDifficulty;

  return (
    <div className="lessons-page">
      <div className="lessons-page__container">
        <header className="lessons-page__header">
          <h1 className="lessons-page__title">Digital Literacy</h1>
          <p className="lessons-page__description">
            Learn essential digital safety skills to protect yourself online
          </p>
        </header>

        {/* Filters */}
        <div className="lessons-page__filters">
          <div className="lessons-page__search">
            <input
              type="search"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lessons-page__search-input"
              aria-label="Search lessons"
            />
            <span className="lessons-page__search-icon">🔍</span>
          </div>

          <div className="lessons-page__filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="lessons-page__select"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="lessons-page__select"
              aria-label="Filter by difficulty"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="lessons-page__clear-filters"
                aria-label="Clear all filters"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="lessons-page__results-info">
            <p className="lessons-page__results-count">
              {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'} found
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="lessons-page__loading">
            <LoadingSpinner size="lg" label="Loading lessons..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="lessons-page__error" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && lessons.length === 0 && (
          <div className="lessons-page__empty">
            <div className="lessons-page__empty-icon">📚</div>
            <h3>No lessons found</h3>
            <p>Try adjusting your search or filters</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="lessons-page__empty-action">
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Lessons Grid */}
        {!loading && lessons.length > 0 && (
          <div className="lessons-page__grid">
            {lessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson}
                onClick={() => handleLessonClick(lesson.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
