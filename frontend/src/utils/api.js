/**
 * API client utility
 * Configured axios instance for backend communication
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors consistently
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.error?.message || 'An error occurred';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('No response from server'));
    } else {
      // Something else happened
      return Promise.reject(error);
    }
  }
);

/**
 * Convenience wrapper for making API requests with relative URLs.
 * Usage: apiRequest('/api/endpoint/', { method: 'POST', body: JSON.stringify(payload) })
 */
export const apiRequest = async (url, options = {}) => {
  const { method = 'GET', body, headers = {} } = options;
  const config = {
    url,
    method,
    headers,
    // Only include data for methods that support a body
    ...(body !== undefined ? { data: body } : {}),
  };
  const response = await api.request(config);
  return response.data;
};

export default api;
