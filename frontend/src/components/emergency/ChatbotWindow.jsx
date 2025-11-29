/**
 * ChatbotWindow Component
 * Chat interface for interacting with the support chatbot.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import './ChatbotWindow.css';

export const ChatbotWindow = ({
  messages = [],
  onSendMessage,
  isLoading = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input after sending message
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) {
      return;
    }

    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="chatbot-window">
      <div className="chatbot-window__messages" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.length === 0 ? (
          <div className="chatbot-window__empty">
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-window__message chatbot-window__message--${message.sender}`}
            >
              <div className="chatbot-window__message-content">
                <div className="chatbot-window__message-header">
                  <span className="chatbot-window__message-sender">
                    {message.sender === 'user' ? 'You' : 'Support Bot'}
                  </span>
                  <span className="chatbot-window__message-time">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <div className="chatbot-window__message-text">
                  {message.text}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="chatbot-window__message chatbot-window__message--bot">
            <div className="chatbot-window__message-content">
              <div className="chatbot-window__typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-window__input-form" onSubmit={handleSubmit}>
        <div className="chatbot-window__input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="chatbot-window__input"
            aria-label="Chat message input"
            maxLength="500"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!inputValue.trim() || isLoading}
            className="chatbot-window__send-button"
            aria-label="Send message"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
