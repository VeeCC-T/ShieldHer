/**
 * Custom hook for handling donation submissions.
 */

import { useState } from 'react';
import { apiRequest } from '../utils/api';

export const useDonations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [donation, setDonation] = useState(null);

  const submitDonation = async (donationData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setDonation(null);

    try {
      const response = await apiRequest('/api/donations/', {
        method: 'POST',
        body: JSON.stringify(donationData)
      });

      setDonation(response.donation);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error('Error submitting donation:', err);
      setError(err.message || 'Failed to process donation');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setDonation(null);
  };

  return {
    submitDonation,
    loading,
    error,
    success,
    donation,
    reset
  };
};

/**
 * Hook for retrieving donation by confirmation code
 */
export const useDonationLookup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donation, setDonation] = useState(null);

  const lookupDonation = async (confirmationCode) => {
    setLoading(true);
    setError(null);
    setDonation(null);

    try {
      const data = await apiRequest(`/api/donations/${confirmationCode}/`);
      setDonation(data);
      return data;
    } catch (err) {
      console.error('Error looking up donation:', err);
      setError(err.message || 'Donation not found');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    lookupDonation,
    loading,
    error,
    donation
  };
};
