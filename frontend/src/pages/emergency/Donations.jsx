/**
 * Donations Page
 * Donation form and confirmation for supporting the platform.
 */

import React, { useState } from 'react';
import { useDonations } from '../../hooks/useDonations';
import { DonationForm } from '../../components/emergency/DonationForm';
import { Button } from '../../components/common/Button';
import './Donations.css';

export const Donations = () => {
  const { submitDonation, loading, error, success, donation, reset } = useDonations();
  const [showForm, setShowForm] = useState(true);

  const handleDonationSubmit = async (donationData) => {
    try {
      await submitDonation(donationData);
      setShowForm(false);
    } catch (err) {
      // Error is handled by the hook
      console.error('Donation failed:', err);
    }
  };

  const handleNewDonation = () => {
    reset();
    setShowForm(true);
  };

  return (
    <div className="donations-page">
      <div className="donations-page__container">
        {showForm ? (
          <>
            <header className="donations-page__header">
              <h1 className="donations-page__title">Support ShieldHer</h1>
              <p className="donations-page__description">
                Your donation helps us provide critical resources and support to survivors of domestic violence. Every contribution makes a difference.
              </p>
            </header>

            <div className="donations-page__content">
              <div className="donations-page__form-section">
                <DonationForm
                  onSubmit={handleDonationSubmit}
                  suggestedAmounts={[10, 25, 50, 100]}
                  isProcessing={loading}
                />

                {error && (
                  <div className="donations-page__error" role="alert">
                    <p>{error}</p>
                  </div>
                )}
              </div>

              <aside className="donations-page__sidebar">
                <div className="donations-page__impact-card">
                  <h2 className="donations-page__impact-title">Your Impact</h2>
                  <div className="donations-page__impact-items">
                    <div className="donations-page__impact-item">
                      <span className="donations-page__impact-amount">$10</span>
                      <p className="donations-page__impact-text">
                        Provides access to digital literacy resources for one person
                      </p>
                    </div>
                    <div className="donations-page__impact-item">
                      <span className="donations-page__impact-amount">$25</span>
                      <p className="donations-page__impact-text">
                        Supports helpline directory maintenance for one month
                      </p>
                    </div>
                    <div className="donations-page__impact-item">
                      <span className="donations-page__impact-amount">$50</span>
                      <p className="donations-page__impact-text">
                        Helps develop new safety resources and tools
                      </p>
                    </div>
                    <div className="donations-page__impact-item">
                      <span className="donations-page__impact-amount">$100</span>
                      <p className="donations-page__impact-text">
                        Funds platform hosting and security for one month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="donations-page__info-card">
                  <h3 className="donations-page__info-title">Secure & Private</h3>
                  <ul className="donations-page__info-list">
                    <li>All transactions are encrypted</li>
                    <li>No payment details are stored</li>
                    <li>Anonymous donations available</li>
                    <li>100% goes to platform support</li>
                  </ul>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <div className="donations-page__success">
            <div className="donations-page__success-icon">✓</div>
            <h1 className="donations-page__success-title">Thank You!</h1>
            <p className="donations-page__success-message">
              Your donation has been successfully processed. Your support helps us continue providing critical resources to survivors.
            </p>
            
            {donation && (
              <div className="donations-page__success-details">
                <p className="donations-page__success-detail">
                  <strong>Confirmation Code:</strong> {donation.confirmation_code}
                </p>
                <p className="donations-page__success-detail">
                  <strong>Amount:</strong> ${donation.amount} {donation.currency}
                </p>
                <p className="donations-page__success-note">
                  Please save your confirmation code for your records.
                </p>
              </div>
            )}

            <div className="donations-page__success-actions">
              <Button
                variant="primary"
                onClick={handleNewDonation}
                aria-label="Make another donation"
              >
                Make Another Donation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
