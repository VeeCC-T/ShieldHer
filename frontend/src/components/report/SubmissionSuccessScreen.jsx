import React from 'react';
import Card from '../common/Card/Card.jsx';
import Button from '../common/Button/Button.jsx';

const SubmissionSuccessScreen = ({ onNew }) => (
  <Card padding="lg" shadow="lg" className="submission-success-card">
    <h2>Report Submitted</h2>
    <p>Your anonymous report has been processed locally. No personal data stored.</p>
    <div className="submission-success-card__options">
      <Button variant="outline" size="sm">Talk to someone now</Button>
      <Button variant="outline" size="sm">View safety tips</Button>
      <Button variant="outline" size="sm">Clear session</Button>
    </div>
    <p className="submission-success-card__affirm">You are not alone.</p>
    <div className="submission-success-card__actions">
      <Button variant="primary" onClick={onNew}>Start New Report</Button>
    </div>
  </Card>
);

export default SubmissionSuccessScreen;
