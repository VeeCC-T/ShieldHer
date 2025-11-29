/**
 * Custom hook for lesson progress tracking
 * Stores progress locally and syncs with backend (future enhancement)
 */

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'shieldher_lesson_progress';

export const useProgress = () => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse progress:', err);
      }
    }
  }, []);

  const saveProgress = (lessonId, data) => {
    const updated = {
      ...progress,
      [lessonId]: {
        ...progress[lessonId],
        ...data,
        lastAccessed: new Date().toISOString(),
      },
    };
    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const markLessonComplete = (lessonId) => {
    saveProgress(lessonId, {
      completed: true,
      completedAt: new Date().toISOString(),
    });
  };

  const saveQuizScore = (lessonId, score, totalQuestions) => {
    saveProgress(lessonId, {
      quizScore: score,
      quizTotal: totalQuestions,
      quizCompletedAt: new Date().toISOString(),
    });
  };

  const getLessonProgress = (lessonId) => {
    return progress[lessonId] || {};
  };

  const getOverallProgress = () => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    const total = Object.keys(progress).length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  return {
    progress,
    saveProgress,
    markLessonComplete,
    saveQuizScore,
    getLessonProgress,
    getOverallProgress,
  };
};
