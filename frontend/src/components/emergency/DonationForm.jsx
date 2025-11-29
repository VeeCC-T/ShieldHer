/**
 * DonationForm Component
 * Form for submitting donations with validation.
 */

import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import './DonationForm.css';

export const DonationForm = ({
  onSubmit,
  suggestedAmounts = [10, 25, 50, 100],
  isProcessing = false
}) => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSuggestedAmountClick = (suggestedAmount) => {
    setAmount(suggestedAmount.toString());
    setCustomAmount('');
    setErrors({ ...errors, amount: null });
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value);
    setErrors({ ...errors, amount: null });
  };

  const validate = () => {
    const newErrors = {};

    // Validate amount
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (amountNum <= 0) {
      newErrors.amount = 'Amount must be greater than zero';
    } else if (amountNum > 100000) {
      newErrors.amount = 'Amount cannot exceed $100,000';
    }

    // Validate email if not anonymous
    if (!isAnonymous && !donorEmail) {
      newErrors.donorEmail = 'Email is required for non-anonymous donations';
    } else if (!isAnonymous && donorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      newErrors.donorEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const donationData = {
      amount: parseFloat(amount),
      currency: 'USD',
      donor_email: isAnonymous ? '' : donorEmail,
      is_anonymous: isAnonymous,
      message: message.trim(),
      payment_intent_id: `pi_mock_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    };

    onSubmit(donationData);
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <div className="donation-form__section">
        <h3 className="donation-form__section-title">Select Amount</h3>
        
        <div className="donation-form__suggested-amounts">
          {suggestedAmounts.map((suggestedAmount) => (
            <button
              key={suggestedAmount}
              type="button"
              className={`donation-form__amount-button ${
                amount === suggestedAmount.toString() ? 'donation-form__amount-button--active' : ''
              }`}
              onClick={() => handleSuggestedAmountClick(suggestedAmount)}
              disabled={isProcessing}
              aria-label={`Donate $${suggestedAmount}`}
            >
              ${suggestedAmount}
            </button>
          ))}
        </div>

        <div className="donation-form__custom-amount">
          <Input
            type="number"
            label="Or enter custom amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter amount"
            min="1"
            max="100000"
            step="0.01"
            disabled={isProcessing}
            error={errors.amount}
            aria-label="Custom donation amount"
          />
        </div>
      </div>

      <div className="donation-form__section">
        <h3 className="donation-form__section-title">Donor Information</h3>
        
        <div className="donation-form__checkbox">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            disabled={isProcessing}
            className="donation-form__checkbox-input"
          />
          <label htmlFor="anonymous" className="donation-form__checkbox-label">
            Make this donation anonymous
          </label>
        </div>

        {!isAnonymous && (
          <Input
            type="email"
            label="Email Address"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isProcessing}
            error={errors.donorEmail}
            required
            aria-label="Donor email address"
          />
        )}
      </div>

      <div className="donation-form__section">
        <label htmlFor="message" className="donation-form__label">
          Message (Optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message of support..."
          disabled={isProcessing}
          className="donation-form__textarea"
          rows="4"
          maxLength="500"
          aria-label="Optional message"
        />
        <div className="donation-form__char-count">
          {message.length}/500 characters
        </div>
      </div>

      <div className="donation-form__actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={isProcessing}
          className="donation-form__submit-button"
          aria-label="Submit donation"
        >
          {isProcessing ? 'Processing...' : `Donate ${amount ? `$${amount}` : ''}`}
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="donation-form__error-summary" role="alert" aria-live="polite">
          Please correct the errors above
        </div>
      )}
    </form>
  );
};
