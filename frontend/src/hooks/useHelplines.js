/**
 * Custom hook for fetching and managing helplines data.
 * Includes offline caching support for emergency access.
 */

import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const CACHE_KEY = 'shieldher_helplines_cache';
const CACHE_VERSION = 1;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const useHelplines = (searchQuery = '', category = '') => {
  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchHelplines = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (category) params.append('category', category);

        const queryString = params.toString();
        const url = `/api/helplines/${queryString ? `?${queryString}` : ''}`;

        // Try to fetch from API
        const data = await apiRequest(url);
        setHelplines(data.results || data);
        setIsOffline(false);

        // Cache the data for offline use (only cache unfiltered results)
        if (!searchQuery && !category) {
          cacheHelplines(data.results || data);
        }
      } catch (err) {
        console.error('Error fetching helplines:', err);
        
        // Try to load from cache if offline
        const cachedData = loadCachedHelplines();
        if (cachedData) {
          setHelplines(filterCachedHelplines(cachedData, searchQuery, category));
          setIsOffline(true);
          setError('Showing cached helplines (offline mode)');
        } else {
          setError(err.message || 'Failed to load helplines');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHelplines();
  }, [searchQuery, category]);

  return { helplines, loading, error, isOffline };
};

/**
 * Cache helplines data to localStorage
 */
const cacheHelplines = (data) => {
  try {
    const cacheData = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      helplines: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (err) {
    console.error('Error caching helplines:', err);
  }
};

/**
 * Load helplines from cache
 */
const loadCachedHelplines = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);

    // Check cache version
    if (cacheData.version !== CACHE_VERSION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    // Check cache age
    const age = Date.now() - cacheData.timestamp;
    if (age > CACHE_DURATION) {
      // Cache is old but still usable in offline mode
      console.warn('Helplines cache is outdated');
    }

    return cacheData.helplines;
  } catch (err) {
    console.error('Error loading cached helplines:', err);
    return null;
  }
};

/**
 * Filter cached helplines by search query and category
 */
const filterCachedHelplines = (helplines, searchQuery, category) => {
  let filtered = [...helplines];

  // Filter by category
  if (category) {
    filtered = filtered.filter(h => h.category === category);
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(h =>
      h.name.toLowerCase().includes(query) ||
      h.description.toLowerCase().includes(query) ||
      h.phone_number.includes(query)
    );
  }

  return filtered;
};

/**
 * Clear helplines cache
 */
export const clearHelplinesCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (err) {
    console.error('Error clearing helplines cache:', err);
  }
};
