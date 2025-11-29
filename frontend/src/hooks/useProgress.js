/**
 * Custom hook for lesson progress tracking with gamification
 * Stores progress locally with badges, streaks, and achievements
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'shieldher_lesson_progress';
const ACHIEVEMENTS_KEY = 'shieldher_achievements';

export const useProgress = () => {
  const [progress, setProgress] = useState({});
  const [achievements, setAchievements] = useState({
    badges: [],
    streak: 0,
    lastActivityDate: null,
    totalPoints: 0,
    perfectScores: 0,
  });

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

    // Load achievements
    const storedAchievements = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (storedAchievements) {
      try {
        setAchievements(JSON.parse(storedAchievements));
      } catch (err) {
        console.error('Failed to parse achievements:', err);
      }
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  useEffect(() => {
    if (achievements.totalPoints > 0 || achievements.badges.length > 0) {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    }
  }, [achievements]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastDate = achievements.lastActivityDate;

    if (!lastDate || lastDate === today) {
      // Same day, keep current streak
      return achievements.streak || 1;
    } else if (lastDate === yesterday) {
      // Consecutive day, increment
      return achievements.streak + 1;
    } else {
      // Streak broken, reset
      return 1;
    }
  }, [achievements.lastActivityDate, achievements.streak]);

  const checkAndAwardBadges = useCallback((newProgress, newAchievements) => {
    const newBadges = [...newAchievements.badges];
    const completedCount = Object.values(newProgress).filter(p => p.completed).length;

    // First lesson badge
    if (completedCount === 1 && !newBadges.includes('first-step')) {
      newBadges.push('first-step');
    }

    // 5 lessons badge
    if (completedCount === 5 && !newBadges.includes('dedicated-learner')) {
      newBadges.push('dedicated-learner');
    }

    // All lessons badge
    if (completedCount >= 10 && !newBadges.includes('digital-guardian')) {
      newBadges.push('digital-guardian');
    }

    // Perfect score badge
    if (newAchievements.perfectScores >= 3 && !newBadges.includes('perfectionist')) {
      newBadges.push('perfectionist');
    }

    // Week streak badge
    if (newAchievements.streak >= 7 && !newBadges.includes('committed')) {
      newBadges.push('committed');
    }

    // High scorer badge (1000+ points)
    if (newAchievements.totalPoints >= 1000 && !newBadges.includes('point-master')) {
      newBadges.push('point-master');
    }

    return newBadges;
  }, []);

  const saveProgress = useCallback((lessonId, data) => {
    const updated = {
      ...progress,
      [lessonId]: {
        ...progress[lessonId],
        ...data,
        lastAccessed: new Date().toISOString(),
      },
    };
    setProgress(updated);
  }, [progress]);

  const markLessonComplete = useCallback((lessonId, quizScore = null, quizTotal = null) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        ...progress[lessonId],
        completed: true,
        completedAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
        ...(quizScore !== null && { quizScore, quizTotal }),
      },
    };

    const basePoints = 100;
    const quizPoints = quizScore && quizTotal ? Math.floor((quizScore / quizTotal) * 100) : 0;
    const totalPoints = basePoints + quizPoints;

    const newStreak = updateStreak();
    const isPerfectScore = quizScore === quizTotal && quizTotal > 0;

    const newAchievements = {
      ...achievements,
      streak: newStreak,
      lastActivityDate: new Date().toDateString(),
      totalPoints: achievements.totalPoints + totalPoints,
      perfectScores: isPerfectScore ? achievements.perfectScores + 1 : achievements.perfectScores,
    };

    newAchievements.badges = checkAndAwardBadges(newProgress, newAchievements);

    setProgress(newProgress);
    setAchievements(newAchievements);

    return {
      newBadges: newAchievements.badges.filter(b => !achievements.badges.includes(b)),
      pointsEarned: totalPoints,
      streakCount: newStreak,
    };
  }, [progress, achievements, updateStreak, checkAndAwardBadges]);

  const saveQuizScore = useCallback((lessonId, score, totalQuestions) => {
    saveProgress(lessonId, {
      quizScore: score,
      quizTotal: totalQuestions,
      quizCompletedAt: new Date().toISOString(),
    });
  }, [saveProgress]);

  const getLessonProgress = useCallback((lessonId) => {
    return progress[lessonId] || {};
  }, [progress]);

  const getOverallProgress = useCallback(() => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    const total = Object.keys(progress).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [progress]);

  const getAchievements = useCallback(() => {
    return {
      ...achievements,
      completedLessons: Object.values(progress).filter(p => p.completed).length,
    };
  }, [achievements, progress]);

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress({});
      setAchievements({
        badges: [],
        streak: 0,
        lastActivityDate: null,
        totalPoints: 0,
        perfectScores: 0,
      });
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACHIEVEMENTS_KEY);
    }
  }, []);

  return {
    progress,
    achievements,
    saveProgress,
    markLessonComplete,
    saveQuizScore,
    getLessonProgress,
    getOverallProgress,
    getAchievements,
    resetProgress,
  };
};
