/**
 * LessonsPage - Digital Literacy Module
 * Implemented by Person B
 */

import React from 'react';
import { useLessons } from '../../hooks/useLessons';
import { LessonCard } from '../../components/literacy/LessonCard';
import './LessonsPage.css';

export const LessonsPage = () => {
  const { lessons, loading, error } = useLessons();

  return (
    <div className="lessons-page">
      <div className="lessons-page__container">
        <header className="lessons-page__header">
          <h1 className="lessons-page__title">Digital Literacy</h1>
          <p className="lessons-page__description">
            Learn essential digital safety skills to protect yourself online
          </p>
        </header>

        {loading && <div className="lessons-page__loading">Loading lessons...</div>}
        {error && <div className="lessons-page__error">{error}</div>}

        <div className="lessons-page__grid">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};
