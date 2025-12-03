import React from 'react';
import Card from '../common/Card/Card.jsx';
import Button from '../common/Button/Button.jsx';
import { redactLocal } from './utilsRedaction';
import { useReportSession } from './sessionContext';
import './ReportReviewScreen.css';

const checklist = [
  'Is this accurate?',
  'Did you remove personal details?',
  'Are links safe to share?',
];

const ReportReviewScreen = ({ draft, onEdit, onSubmit }) => {
  const { reportDraft } = useReportSession();
  const data = draft || reportDraft || {};
  if (!data.description) return (
    <Card padding="lg"><p>No draft available. Go back to form.</p></Card>
  );
  return (
    <Card padding="lg" shadow="lg" className="report-review-card">
      <h2>Review Your Report</h2>
      <p>Please double‑check before submitting. You can still edit anything.</p>
      <div className="report-review-card__checklist">
        <ul>
          {checklist.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="report-review-card__preview">
        <strong>Final Description (auto‑redacted)</strong>
        <pre>{redactLocal(data.description)}</pre>
      </div>
      {data.evidence_links?.length > 0 && (
        <div className="report-review-card__evidence">
          <strong>Evidence Links</strong>
          <ul>
            {data.evidence_links.map(l => <li key={l}>{l}</li>)}
          </ul>
        </div>
      )}
      <div className="report-review-card__actions">
        <Button variant="secondary" onClick={onEdit}>Back to Edit</Button>
        <Button variant="primary" onClick={onSubmit}>Submit Anonymously</Button>
      </div>
    </Card>
  );
};

export default ReportReviewScreen;
