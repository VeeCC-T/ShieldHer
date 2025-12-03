import React, { useState } from 'react';
import Card from '../common/Card/Card.jsx';
import { useReportSession } from './sessionContext';
import './ThreatAssessmentPrompt.css';

const questions = [
  { key: 'safe_now', text: 'Are you safe right now?' },
  { key: 'need_help', text: 'Do you need urgent help?' },
  { key: 'repeated', text: 'Has this happened before?' },
];

const ThreatAssessmentPrompt = () => {
  const { updateDraft, reportDraft } = useReportSession();
  const [answers, setAnswers] = useState(reportDraft?.assessment || {});

  const setAnswer = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    updateDraft({ ...(reportDraft || {}), assessment: next });
  };

  return (
    <Card padding="md" shadow="sm" className="threat-assessment-card">
      <h2 className="threat-assessment-card__title">Quick Check-In</h2>
      <p className="threat-assessment-card__intro">These gentle questions help us prioritize guidance. You can skip them if you prefer.</p>
      <ul className="threat-assessment-card__list">
        {questions.map(q => (
          <li key={q.key} className="threat-assessment-card__item">
            <span>{q.text}</span>
            <div className="threat-assessment-card__choices">
              <button type="button" onClick={() => setAnswer(q.key, 'yes')} className={answers[q.key] === 'yes' ? 'active' : ''}>Yes</button>
              <button type="button" onClick={() => setAnswer(q.key, 'no')} className={answers[q.key] === 'no' ? 'active' : ''}>No</button>
              <button type="button" onClick={() => setAnswer(q.key, 'skip')} className={answers[q.key] === 'skip' ? 'active' : ''}>Skip</button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ThreatAssessmentPrompt;
