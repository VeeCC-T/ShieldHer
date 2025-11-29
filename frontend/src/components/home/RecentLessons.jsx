/**
 * RecentLessons Component
 * Shows recent or recommended lessons from Person B's literacy module
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import './RecentLessons.css';

export const RecentLessons = () => {
  // Mock data - in real app, this would come from Person B's lessons API
  const lessons = [
    {
      id: 1,
      title: 'Password Security Basics',
      description: 'Learn how to create and manage strong passwords',
      progress: 75,
      difficulty: 'Beginner',
      duration: '10 min',
      icon: '🔐'
    },
    {
      id: 2,
      title: 'Social Media Privacy',
      description: 'Control your privacy settings on social platforms',
      progress: 30,
      difficulty: 'Intermediate',
      duration: '15 min',
      icon: '📱'
    },
    {
      id: 3,
      title: 'Recognizing Online Scams',
      description: 'Identify and avoid common online scams',
      progress: 0,
      difficulty: 'Beginner',
      duration: '12 min',
      icon: '🚨'
    }
  ];

  return (
    <div className="recent-lessons">
      <div className="recent-lessons__grid">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="recent-lessons__card">
            <div className="recent-lessons__header">
              <div className="recent-lessons__icon">{lesson.icon}</div>
              <div className="recent-lessons__meta">
                <span className="recent-lessons__difficulty">{lesson.difficulty}</span>
                <span className="recent-lessons__duration">{lesson.duration}</span>
              </div>
            </div>
            <h3 className="recent-lessons__title">{lesson.title}</h3>
            <p className="recent-lessons__description">{lesson.description}</p>
            {lesson.progress > 0 && (
              <div className="recent-lessons__progress">
                <div className="recent-lessons__progress-bar">
                  <div 
                    className="recent-lessons__progress-fill"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
                <span className="recent-lessons__progress-text">
                  {lesson.progress}% complete
                </span>
              </div>
            )}
            <div className="recent-lessons__actions">
              <Button
                as={Link}
                to={`/literacy/lesson/${lesson.id}`}
                variant={lesson.progress > 0 ? 'primary' : 'secondary'}
                size="small"
                aria-label={`${lesson.progress > 0 ? 'Continue' : 'Start'} lesson: ${lesson.title}`}
              >
                {lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="recent-lessons__footer">
        <Button
          as={Link}
          to="/literacy"
          variant="outline"
          size="large"
          aria-label="View all lessons"
        >
          View All Lessons
        </Button>
      </div>
    </div>
  );
};
