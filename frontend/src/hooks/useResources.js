/**
 * Custom hook for fetching and managing resources data.
 */

import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

export const useResources = (searchQuery = '', category = '') => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (category) params.append('category', category);

        const queryString = params.toString();
        const url = `/api/resources/${queryString ? `?${queryString}` : ''}`;

        const data = await apiRequest(url);
        setResources(data.results || data);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError(err.message || 'Failed to load resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [searchQuery, category]);

  return { resources, loading, error };
};

/**
 * Hook for fetching a single resource by ID
 */
export const useResource = (resourceId) => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resourceId) {
      setLoading(false);
      return;
    }

    const fetchResource = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await apiRequest(`/api/resources/${resourceId}/`);
        setResource(data);
      } catch (err) {
        console.error('Error fetching resource:', err);
        setError(err.message || 'Failed to load resource');
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [resourceId]);

  return { resource, loading, error };
};
