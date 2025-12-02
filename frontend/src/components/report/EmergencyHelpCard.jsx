import React from 'react';
import Card from '../common/Card/Card.jsx';

const EmergencyHelpCard = () => (
  <Card padding="md" shadow="sm" className="emergency-help-card">
    <h2 className="emergency-help-card__title">Need Immediate Help?</h2>
    <p>If you feel in danger, contact local support right away.</p>
    <ul className="emergency-help-card__channels">
      <li><span role="img" aria-label="phone">📞</span> Local Hotline</li>
      <li><span role="img" aria-label="hospital">🏥</span> Nearby Clinic</li>
      <li><span role="img" aria-label="community">🤝</span> Community Center</li>
    </ul>
    <p className="emergency-help-card__note">We keep this discreet—only you can see it.</p>
  </Card>
);

export default EmergencyHelpCard;
