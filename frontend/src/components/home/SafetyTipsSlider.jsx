/**
 * SafetyTipsSlider Component
 * Rotating safety tips for users
 */
import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import './SafetyTipsSlider.css';

export const SafetyTipsSlider = () => {
  const [currentTip, setCurrentTip] = useState(0);
  
  const safetyTips = [
    {
      icon: '🔒',
      title: 'Use Strong Passwords',
      tip: 'Create unique passwords for each account and use a password manager to keep them secure.'
    },
    {
      icon: '🕵️',
      title: 'Browse Privately',
      tip: 'Use incognito/private browsing mode and clear your history regularly to protect your privacy.'
    },
    {
      icon: '📱',
      title: 'Secure Your Phone',
      tip: 'Enable screen locks, use two-factor authentication, and regularly review app permissions.'
    },
    {
      icon: '🚫',
      title: 'Block Unwanted Contact',
      tip: 'Don\'t hesitate to block, report, or restrict people who make you feel unsafe online.'
    },
    {
      icon: '🛡️',
      title: 'Trust Your Instincts',
      tip: 'If something feels wrong or unsafe, trust your gut feeling and seek help immediately.'
    },
    {
      icon: '💬',
      title: 'Safe Communication',
      tip: 'Use secure messaging apps and be cautious about sharing personal information online.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % safetyTips.length);
    }, 5000); // Change tip every 5 seconds

    return () => clearInterval(interval);
  }, [safetyTips.length]);

  const goToTip = (index) => {
    setCurrentTip(index);
  };

  return (
    <div className="safety-tips-slider">
      <Card className="safety-tips-slider__card">
        <div className="safety-tips-slider__content">
          <div className="safety-tips-slider__icon">
            {safetyTips[currentTip].icon}
          </div>
          <h3 className="safety-tips-slider__title">
            {safetyTips[currentTip].title}
          </h3>
          <p className="safety-tips-slider__tip">
            {safetyTips[currentTip].tip}
          </p>
        </div>
        <div className="safety-tips-slider__indicators">
          {safetyTips.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTip(index)}
              className={`safety-tips-slider__indicator ${
                index === currentTip ? 'safety-tips-slider__indicator--active' : ''
              }`}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
