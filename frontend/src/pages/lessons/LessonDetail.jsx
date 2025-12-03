/**
 * LessonDetail Page - Full lesson view with content and quiz
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLesson } from '../../hooks/useLessons';
import { useProgress } from '../../hooks/useProgress';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { Button } from '../../components/common/Button';
import './LessonDetail.css';

export const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lesson, loading, error } = useLesson(id);
  const { completeLesson, awardBadge } = useProgress();
  
  const [currentView, setCurrentView] = useState('content'); // 'content' or 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (loading) {
    return (
      <div className="lesson-detail lesson-detail--loading">
        <LoadingSpinner size="lg" label="Loading lesson..." />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="lesson-detail lesson-detail--error">
        <div className="lesson-detail__error-content">
          <h2>Lesson Not Found</h2>
          <p>{error || 'The lesson you are looking for does not exist.'}</p>
          <Button variant="primary" onClick={() => navigate('/literacy')}>
            Back to Lessons
          </Button>
        </div>
      </div>
    );
  }

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    lesson.quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizSubmitted(true);

    // Award points and check for badge
    const percentage = (correctCount / lesson.quiz.length) * 100;
    completeLesson(lesson.id, percentage >= 70);

    if (percentage === 100) {
      awardBadge('perfect_score');
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const getCategoryColor = (category) => {
    const colors = {
      privacy: '#ec4899',
      safety: '#a855f7',
      security: '#3b82f6',
      awareness: '#10b981',
    };
    return colors[category] || '#78716c';
  };

  return (
    <div className="lesson-detail">
      <div className="lesson-detail__container">
        {/* Header */}
        <header className="lesson-detail__header">
          <button 
            className="lesson-detail__back"
            onClick={() => navigate('/literacy')}
            aria-label="Back to lessons"
          >
            ← Back to Lessons
          </button>
          
          <div className="lesson-detail__title-area">
            <h1 className="lesson-detail__title">{lesson.title}</h1>
            <div className="lesson-detail__meta">
              <span 
                className="lesson-detail__category"
                style={{ backgroundColor: getCategoryColor(lesson.category) }}
              >
                {lesson.category}
              </span>
              <span className="lesson-detail__difficulty">
                {lesson.difficulty}
              </span>
              <span className="lesson-detail__duration">
                ⏱️ {lesson.duration_minutes} min
              </span>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="lesson-detail__tabs">
          <button
            className={`lesson-detail__tab ${currentView === 'content' ? 'lesson-detail__tab--active' : ''}`}
            onClick={() => setCurrentView('content')}
          >
            📖 Lesson Content
          </button>
          <button
            className={`lesson-detail__tab ${currentView === 'quiz' ? 'lesson-detail__tab--active' : ''}`}
            onClick={() => setCurrentView('quiz')}
          >
            📝 Quiz ({lesson.quiz?.length || 0} questions)
          </button>
        </nav>

        {/* Content */}
        <div className="lesson-detail__content">
          {currentView === 'content' ? (
            <div className="lesson-detail__lesson-content">
              <div 
                className="lesson-detail__html-content"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
              
              <div className="lesson-detail__actions">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setCurrentView('quiz')}
                >
                  Take the Quiz →
                </Button>
              </div>
            </div>
          ) : (
            <div className="lesson-detail__quiz">
              {!quizSubmitted ? (
                <>
                  <div className="lesson-detail__quiz-intro">
                    <h2>Test Your Knowledge</h2>
                    <p>Answer all questions to complete this lesson and earn points!</p>
                  </div>

                  {lesson.quiz.map((question, idx) => (
                    <div key={question.id} className="quiz-question">
                      <h3 className="quiz-question__title">
                        Question {idx + 1} of {lesson.quiz.length}
                      </h3>
                      <p className="quiz-question__text">{question.question}</p>
                      
                      <div className="quiz-question__options">
                        {question.options.map((option, optionIdx) => (
                          <label
                            key={optionIdx}
                            className={`quiz-option ${
                              quizAnswers[question.id] === optionIdx ? 'quiz-option--selected' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optionIdx}
                              checked={quizAnswers[question.id] === optionIdx}
                              onChange={() => handleQuizAnswer(question.id, optionIdx)}
                            />
                            <span className="quiz-option__label">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="lesson-detail__quiz-actions">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
                    >
                      Submit Quiz
                    </Button>
                    {Object.keys(quizAnswers).length !== lesson.quiz.length && (
                      <p className="lesson-detail__quiz-hint">
                        Please answer all questions to submit
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="lesson-detail__quiz-results">
                  <div className={`quiz-results ${score === lesson.quiz.length ? 'quiz-results--perfect' : score >= lesson.quiz.length * 0.7 ? 'quiz-results--pass' : 'quiz-results--fail'}`}>
                    <div className="quiz-results__icon">
                      {score === lesson.quiz.length ? '🎉' : score >= lesson.quiz.length * 0.7 ? '✅' : '📚'}
                    </div>
                    <h2 className="quiz-results__title">
                      {score === lesson.quiz.length ? 'Perfect Score!' : score >= lesson.quiz.length * 0.7 ? 'You Passed!' : 'Keep Learning!'}
                    </h2>
                    <p className="quiz-results__score">
                      You scored {score} out of {lesson.quiz.length}
                    </p>
                    <p className="quiz-results__percentage">
                      {Math.round((score / lesson.quiz.length) * 100)}%
                    </p>

                    {score === lesson.quiz.length && (
                      <p className="quiz-results__message">
                        Excellent work! You've mastered this lesson! 🏆
                      </p>
                    )}
                    {score >= lesson.quiz.length * 0.7 && score < lesson.quiz.length && (
                      <p className="quiz-results__message">
                        Great job! You've completed this lesson.
                      </p>
                    )}
                    {score < lesson.quiz.length * 0.7 && (
                      <p className="quiz-results__message">
                        Review the lesson content and try again to pass.
                      </p>
                    )}

                    <div className="quiz-results__review">
                      <h3>Review Your Answers</h3>
                      {lesson.quiz.map((question, idx) => {
                        const userAnswer = quizAnswers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return (
                          <div key={question.id} className={`quiz-review-item ${isCorrect ? 'quiz-review-item--correct' : 'quiz-review-item--incorrect'}`}>
                            <div className="quiz-review-item__header">
                              <span className="quiz-review-item__number">Q{idx + 1}</span>
                              <span className="quiz-review-item__status">
                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                              </span>
                            </div>
                            <p className="quiz-review-item__question">{question.question}</p>
                            <p className="quiz-review-item__answer">
                              <strong>Your answer:</strong> {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="quiz-review-item__correct-answer">
                                <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="quiz-results__actions">
                      <Button variant="primary" onClick={() => navigate('/literacy')}>
                        Back to Lessons
                      </Button>
                      <Button variant="outline" onClick={handleRetakeQuiz}>
                        Retake Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
