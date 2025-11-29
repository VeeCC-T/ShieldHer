/**
 * Custom hook for lessons API
 * Handles fetching lessons, lesson details, and quiz submission
 */

import { useState, useEffect } from 'react';
import api from '../utils/api';

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
      
      const response = await api.get(`/api/lessons/?${params.toString()}`);
      
      setLessons(response.data.results || response.data);
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (err) {
      setError(err.message);
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
      const response = await api.get(`/api/lessons/${id}/`);
      setLesson(response.data);
    } catch (err) {
      setError(err.message);
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
      const response = await api.get('/api/lessons/categories/');
      setCategories(response.data.categories || []);
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
      const response = await api.get('/api/lessons/difficulties/');
      setDifficulties(response.data.difficulties || []);
    } catch (err) {
      console.error('Failed to fetch difficulties:', err);
    } finally {
      setLoading(false);
    }
  };

  return { difficulties, loading };
};
