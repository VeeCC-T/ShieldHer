/**
 * PrivacyGuide Component
 * Provides comprehensive privacy and safety guides for users.
 */

import React from 'react';
import './PrivacyGuide.css';

export const PrivacyGuide = () => {
  const guides = [
    {
      title: 'Blocking & Filtering',
      content: 'Learn how to block users and filter content on social media platforms to protect yourself from harassment.'
    },
    {
      title: 'Reporting Abuse',
      content: 'Step-by-step instructions on how to report abuse online and to authorities.'
    },
    {
      title: 'Privacy Settings',
      content: 'Tips for securing your browser and account privacy settings across different platforms.'
    },
    {
      title: 'Safety Planning',
      content: 'Create a digital and physical safety plan to protect yourself and your information.'
    }
  ];

  return (
    <div className="privacy-guide">
      <div className="privacy-guide__grid">
        {guides.map((guide, index) => (
          <div key={index} className="privacy-guide__card">
            <div className="privacy-guide__card-icon">📚</div>
            <h4 className="privacy-guide__card-title">{guide.title}</h4>
            <p className="privacy-guide__card-content">{guide.content}</p>
          </div>
        ))}
      </div>

      {/* <div className="privacy-guide__emergency">
        <span className="privacy-guide__emergency-icon">🆘</span>
        <p className="privacy-guide__emergency-text">
          In immediate danger? Call <strong>911</strong> or National Domestic Violence Hotline: <strong>1-800-799-7233</strong>
        </p>
      </div> */}
    </div>
  );
};
