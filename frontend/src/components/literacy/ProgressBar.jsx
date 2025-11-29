/**
 * ProgressBar component
 * Displays gamified progress tracking
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

const ProgressBar = ({ completed, total, showLabel = true }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-bar">
      {showLabel && (
        <div className="progress-bar__label">
          <span className="progress-bar__text">
            {completed} of {total} lessons completed
          </span>
          <span className="progress-bar__percentage">{percentage}%</span>
        </div>
      )}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage > 10 && (
            <span className="progress-bar__fill-text">{percentage}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  showLabel: PropTypes.bool,
};

export default ProgressBar;
