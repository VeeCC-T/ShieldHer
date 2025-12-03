/**
 * Home Page
 * Clean, professional design matching the ShieldHer brand
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import './Home.css';

export const Home = () => {

  const safetyTips = [
    'Use private browsing mode when accessing sensitive information',
    'Enable panic exit shortcut in Settings for quick site exit',
    'Clear your browsing history regularly',
    'Create a safety plan and keep it updated',
    'Trust your instincts - if something feels wrong, seek help'
  ];

  return (
    <div className="home">
      {/* Hero Section - Gradient Banner */}
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">You Are Not Alone</h1>
          <p className="home__hero-subtitle">
            ShieldHer provides safe, anonymous support and resources for survivors of domestic violence.
          </p>
          
          <div className="home__hero-actions">
            <Link to="/emergency/helplines">
              <Button variant="primary" size="lg" className="home__cta-btn home__cta-btn--primary">
                Get Help Now
              </Button>
            </Link>
            <Link to="/literacy">
              <Button variant="outline" size="lg" className="home__cta-btn home__cta-btn--secondary">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Emergency Contact Card - Inside Hero */}
          <div className="home__emergency-card">
            <p className="home__emergency-text">
              <strong>In immediate danger?</strong> Call 911 or the National Domestic Violence Hotline
            </p>
            <a href="tel:1-800-799-7233" className="home__emergency-number">
              📞 1-800-799-7233
            </a>
          </div>
        </div>
      </section>

      {/* Reminder Tip */}
      <section className="home__reminder-section">
        <div className="container">
          <div className="home__reminder-card">
            <span className="home__reminder-icon">💡</span>
            <p className="home__reminder-text">
              Trust your instincts - if something feels wrong, seek help
            </p>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="home__section home__section--alt">
        <div className="container">
          <h2 className="home__section-title">Safety Tips</h2>
          <p className="home__section-desc">Essential practices to keep your digital life secure.</p>
          <div className="home__tips-grid">
            <div className="home__tips-content animate-slide-up">
              <ul className="home__tips-list">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="home__tip-item">
                    <span className="home__tip-icon">💡</span>
                    <span className="home__tip-text">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="home__tips-visual animate-fade-in delay-200">
               {/* Decorative visual element or illustration could go here */}
               <div className="home__tips-card glass-card">
                 <h3>Did you know?</h3>
                 <p>You can enable "Calm Mode" in the reporting tool to reduce visual stimuli if you are feeling overwhelmed.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="home__features-section">
        <div className="container">
          <h2 className="home__section-title">How ShieldHer Helps</h2>
          <div className="home__features">
            <div className="home__feature">
              <div className="home__feature-icon">🔒</div>
              <h3 className="home__feature-title">100% Private</h3>
              <p className="home__feature-text">All settings stored locally. No tracking, no data collection.</p>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">🆘</div>
              <h3 className="home__feature-title">Emergency Access</h3>
              <p className="home__feature-text">Quick access to helplines and resources when you need them most.</p>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">📚</div>
              <h3 className="home__feature-title">Education</h3>
              <p className="home__feature-text">Learn digital safety skills to protect yourself online.</p>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">💜</div>
              <h3 className="home__feature-title">Support</h3>
              <p className="home__feature-text">Connect with resources and support organizations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
