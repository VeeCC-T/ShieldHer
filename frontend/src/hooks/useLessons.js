/**
 * Custom hook for lessons API
 * Handles fetching lessons, lesson details, and quiz submission
 */

import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

export const useLessons = (filters = {}) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, [JSON.stringify(filters)]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.search) params.append('search', filters.search);

      const data = await apiRequest(`/api/lessons/?${params.toString()}`);

      setLessons(data.results || data);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err.message || 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  return { lessons, loading, error, pagination, refetch: fetchLessons };
};

export const useLesson = (id) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchLesson();
    }
  }, [id]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest(`/api/lessons/${id}/`);
      setLesson(data);
    } catch (err) {
      setError(err.message || 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  return { lesson, loading, error, refetch: fetchLesson };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiRequest('/api/lessons/categories/');
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading };
};

export const useDifficulties = () => {
  const [difficulties, setDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDifficulties();
  }, []);

  const fetchDifficulties = async () => {
    try {
      const data = await apiRequest('/api/lessons/difficulties/');
      setDifficulties(data.difficulties || []);
    } catch (err) {
      console.error('Failed to fetch difficulties:', err);
    } finally {
      setLoading(false);
    }
  };

  return { difficulties, loading };
};
