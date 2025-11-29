/**
 * ReportPage - Anonymous Reporting Module
 * Implemented by Person C
 */

import React from 'react';
import { SafeExitButton } from '../../components/report/SafeExitButton';
import { HistoryHideToggle } from '../../components/report/HistoryHideToggle';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import './ReportPage.css';

export const ReportPage = () => {
  return (
    <div className="report-page">
      <div className="report-page__container">
        <header className="report-page__header">
          <h1 className="report-page__title">Anonymous Reporting</h1>
          <p className="report-page__description">
            Report abuse safely and anonymously. No personal information required.
          </p>
          <div className="report-page__safety-tools">
            <SafeExitButton />
            <HistoryHideToggle />
          </div>
        </header>

        <Card>
          <h2>Submit Anonymous Report</h2>
          <p>Report form would be implemented here by Person C</p>
          <Button variant="primary">Submit Report</Button>
        </Card>
      </div>
    </div>
  );
};
