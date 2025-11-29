/**
 * Custom hook for managing chatbot conversations.
 */

import { useState, useCallback } from 'react';
import { apiRequest } from '../utils/api';

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (messageText) => {
    if (!messageText || !messageText.trim()) {
      return;
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Send message to chatbot API
      const response = await apiRequest('/api/chatbot/message/', {
        method: 'POST',
        body: JSON.stringify({ message: messageText })
      });

      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'bot',
        category: response.category,
        timestamp: response.timestamp
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const addWelcomeMessage = useCallback(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: "Hello! I'm here to help you find resources and support. You can ask me about crisis support, legal help, shelters, counseling, or other resources. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    };

    setMessages([welcomeMessage]);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    addWelcomeMessage,
    loading,
    error
  };
};

/**
 * Hook for fetching suggested questions
 */
export const useChatbotSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest('/api/chatbot/suggestions/');
      setSuggestions(response.suggestions || []);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError(err.message || 'Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    suggestions,
    fetchSuggestions,
    loading,
    error
  };
};
