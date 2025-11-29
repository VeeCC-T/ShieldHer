/**
 * Custom hook for managing offline cache and detecting online/offline status.
 */

import { useState, useEffect } from 'react';

export const useOfflineCache = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, isOffline: !isOnline };
};

/**
 * Get cache age in milliseconds
 */
export const getCacheAge = (cacheKey) => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    return Date.now() - cacheData.timestamp;
  } catch (err) {
    console.error('Error getting cache age:', err);
    return null;
  }
};

/**
 * Check if cache is stale (older than duration)
 */
export const isCacheStale = (cacheKey, maxAge) => {
  const age = getCacheAge(cacheKey);
  if (age === null) return true;
  return age > maxAge;
};
