import React from 'react';
import Card from '../common/Card/Card.jsx';
import './PrivacyReminderCard.css';

const PrivacyReminderCard = () => (
  <Card padding="md" shadow="sm" className="privacy-reminder-card">
    <h2 className="privacy-reminder-card__title">You're in control</h2>
    <ul className="privacy-reminder-card__list">
      <li>No account or login required.</li>
      <li>We never ask for names, emails, or phone numbers.</li>
      <li>You can leave anytime using Safe Exit.</li>
      <li>Use a private window if someone monitors your device.</li>
    </ul>
    <p className="privacy-reminder-card__note">Take your time. You can start with just a short description and add more later if you feel comfortable.</p>
  </Card>
);

export default PrivacyReminderCard;
