/**
 * ChatSupport Page
 * AI chatbot interface for automated support and guidance.
 */

import React, { useEffect } from 'react';
import { useChatbot } from '../../hooks/useChatbot';
import { ChatbotWindow } from '../../components/emergency/ChatbotWindow';
import './ChatSupport.css';

export const ChatSupport = () => {
  const { messages, sendMessage, addWelcomeMessage, loading, error } = useChatbot();

  // Add welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      addWelcomeMessage();
    }
  }, [messages.length, addWelcomeMessage]);

  return (
    <div className="chat-support-page">
      <div className="chat-support-page__container">
        <header className="chat-support-page__header">
          <h1 className="chat-support-page__title">Support Chat</h1>
          <p className="chat-support-page__description">
            Get instant answers to your questions. For emergencies, call 911 or the National Domestic Violence Hotline at 1-800-799-7233.
          </p>
        </header>

        <div className="chat-support-page__content">
          <div className="chat-support-page__chat-container">
            <ChatbotWindow
              messages={messages}
              onSendMessage={sendMessage}
              isLoading={loading}
            />
          </div>

          <aside className="chat-support-page__sidebar">
            <div className="chat-support-page__info-card">
              <h2 className="chat-support-page__info-title">How can I help?</h2>
              <p className="chat-support-page__info-text">
                I can provide information about:
              </p>
              <ul className="chat-support-page__info-list">
                <li>Crisis support and emergency help</li>
                <li>Legal assistance and rights</li>
                <li>Emergency shelters</li>
                <li>Counseling and mental health</li>
                <li>Financial assistance</li>
                <li>Safety planning</li>
              </ul>
            </div>

            <div className="chat-support-page__emergency-card">
              <h3 className="chat-support-page__emergency-title">
                Need immediate help?
              </h3>
              <p className="chat-support-page__emergency-text">
                National Domestic Violence Hotline
              </p>
              <a
                href="tel:1-800-799-7233"
                className="chat-support-page__emergency-button"
                aria-label="Call National Domestic Violence Hotline"
              >
                📞 1-800-799-7233
              </a>
              <p className="chat-support-page__emergency-note">
                Available 24/7 in multiple languages
              </p>
            </div>
          </aside>
        </div>

        {error && (
          <div className="chat-support-page__error" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
