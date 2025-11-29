import React from 'react';
import Card from '../common/Card/Card.jsx';

const tips = [
  'Block or mute abusive accounts to reduce exposure.',
  'Capture evidence with screenshots; avoid including personal tabs.',
  'Hide or archive chats instead of deleting if needed for evidence.',
  'Reset passwords if someone may have access to your accounts.',
  'Review privacy settings on each platform you use.',
];

const SafetyTipsCard = () => (
  <Card padding="md" shadow="sm" className="safety-tips-card">
    <h2 className="safety-tips-card__title">Safety Tips</h2>
    <ul className="safety-tips-card__list">
      {tips.map(t => <li key={t}>{t}</li>)}
    </ul>
    <p className="safety-tips-card__foot">You are not alone. If you feel unsafe right now, seek immediate help via local helplines.</p>
  </Card>
);

export default SafetyTipsCard;
