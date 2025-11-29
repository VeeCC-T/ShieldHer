/**
 * ReportPage - Anonymous Reporting Module
 * Implemented by Person C
 */

import React, { useState } from 'react';
import { SafeExitButton } from '../../components/report/SafeExitButton';
import { HistoryHideToggle } from '../../components/report/HistoryHideToggle';
import ReportForm from '../../components/report/ReportForm';
import PrivacyReminderCard from '../../components/report/PrivacyReminderCard';
import SafetyTipsCard from '../../components/report/SafetyTipsCard';
import ThreatAssessmentPrompt from '../../components/report/ThreatAssessmentPrompt';
import EmergencyHelpCard from '../../components/report/EmergencyHelpCard';
import ClearHistoryButton from '../../components/report/ClearHistoryButton';
import CalmModeToggle from '../../components/report/CalmModeToggle.jsx';
import ReportReviewScreen from '../../components/report/ReportReviewScreen';
import SubmissionSuccessScreen from '../../components/report/SubmissionSuccessScreen';
import { useReportSession } from '../../components/report/sessionContext';
import './ReportPage.css';

export const ReportPage = () => {
  const { stage, setStage, reportDraft, clearSession, calmMode } = useReportSession();
  const [showTips, setShowTips] = useState(false);
  const startReport = () => setStage('form');
  const goReview = () => setStage('review');
  const goSuccess = () => setStage('success');
  const backToForm = () => setStage('form');
  const resetAll = () => { clearSession(); setStage('entry'); };

  return (
    <div className="report-page">
      <div className="report-page__container">
        <header className="report-page__header">
          <h1 className="report-page__title">Anonymous Reporting</h1>
          <p className="report-page__description">
            Report abuse safely and anonymously. We never ask for or store personal details. Double‑check your description for names, emails or numbers before submitting.
          </p>
          <div className="report-page__safety-tools">
            <SafeExitButton />
            <HistoryHideToggle />
            <CalmModeToggle />
          </div>
        </header>
        {stage === 'entry' && (
          <div className="report-page__entry">
            <PrivacyReminderCard />
            <ThreatAssessmentPrompt />
            <EmergencyHelpCard />
            <div className="report-page__entry-actions">
              <button className="report-page__primary-btn" onClick={startReport}>Start Report</button>
              <button className="report-page__secondary-btn" onClick={() => setShowTips(p => !p)}>{showTips ? 'Hide Tips' : 'View Safety Tips'}</button>
            </div>
            {showTips && <SafetyTipsCard />}
          </div>
        )}
        {stage === 'form' && (
          <>
            <ReportForm onProceed={goReview} />
            <div className="report-page__form-footer">
              <ClearHistoryButton onCleared={resetAll} />
            </div>
          </>
        )}
        {stage === 'review' && (
          <ReportReviewScreen draft={reportDraft} onEdit={backToForm} onSubmit={goSuccess} />
        )}
        {stage === 'success' && (
          <SubmissionSuccessScreen onNew={resetAll} />
        )}
      </div>
    </div>
  );
};
