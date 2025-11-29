/**
 * ReportForm - Anonymous reporting form
 * Privacy-first: performs client-side PII detection & optional redaction BEFORE sending.
 */
import React, { useState, useEffect, useRef } from 'react';
import Card from '../common/Card/Card.jsx';
import Button from '../common/Button/Button.jsx';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Toast, ToastContainer } from '../common/Toast';
import { apiRequest } from '../../utils/api';
import './ReportForm.css';

// Lightweight client-side PII regexes mirroring backend logic
const PII_REGEX = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  phone: /\b(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  credit_card: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  full_name: /\b(my name is|i am|i'm|called)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)\b/gi,
};

const redactLocal = (text) => {
  if (!text) return text;
  let redacted = text;
  Object.entries(PII_REGEX).forEach(([key, regex]) => {
    if (key === 'full_name') {
      redacted = redacted.replace(regex, (m, p1) => `${p1} [NAME_REDACTED]`);
    } else {
      redacted = redacted.replace(regex, `[${key.toUpperCase()}_REDACTED]`);
    }
  });
  return redacted;
};

const detectLocalPII = (text) => {
  if (!text) return [];
  const found = [];
  Object.entries(PII_REGEX).forEach(([key, regex]) => {
    if (regex.test(text)) found.push(key);
    // Reset lastIndex for global regex reuse
    regex.lastIndex = 0;
  });
  return found;
};

const initialState = {
  incident_type: 'harassment',
  description: '',
  location_free_text: '',
  evidence_links: [''],
  consent_for_followup: false,
  autoRedact: true,
  needs_help: false,
};

const ReportForm = ({ onProceed }) => {
  const [form, setForm] = useState(initialState);
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [piiFound, setPiiFound] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // holds confirmation response
  const [error, setError] = useState(null);
  const [helplines, setHelplines] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [viewRedacted, setViewRedacted] = useState(true);
  const descRef = useRef(null);

  // Toast state (simplified)
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type='info', duration=5000) => {
    const id = Date.now()+Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // Fetch incident types from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await apiRequest('/api/reports/incident_types/');
        setIncidentTypes(data.incident_types || []);
      } catch(e) {
        // fallback
        setIncidentTypes([
          { value: 'harassment', label: 'Harassment' },
          { value: 'stalking', label: 'Stalking' },
          { value: 'impersonation', label: 'Impersonation' },
          { value: 'threats', label: 'Threats' },
          { value: 'other', label: 'Other' },
        ]);
      }
    })();
  }, []);

  // Detect PII whenever description changes
  useEffect(() => {
    setPiiFound(detectLocalPII(form.description));
  }, [form.description]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const updateEvidenceLink = (index, value) => {
    setForm(prev => {
      const links = [...prev.evidence_links];
      links[index] = value;
      return { ...prev, evidence_links: links };
    });
  };

  const addEvidenceLink = () => {
    setForm(prev => ({ ...prev, evidence_links: [...prev.evidence_links, ''] }));
  };

  const removeEvidenceLink = (idx) => {
    setForm(prev => ({ ...prev, evidence_links: prev.evidence_links.filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    if (!form.description.trim()) return 'Description cannot be empty.';
    if (form.description.length < 30) return 'Please provide at least 30 characters to help us understand.';
    if (form.description.length > 5000) return 'Description exceeds maximum length.';
    if (form.location_free_text.length > 200) return 'Context/platform text too long.';
    if (form.evidence_links.some(l => l && !/^https?:\/\//i.test(l))) return 'Evidence links must start with http:// or https://';
    if (form.evidence_links.length > 10) return 'Maximum 10 evidence links allowed.';
    return null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // open confirmation modal first
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      addToast(validationError, 'error');
      return;
    }
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        incident_type: form.incident_type,
        description: form.autoRedact ? redactLocal(form.description) : form.description,
        timestamp: new Date().toISOString(),
        location_free_text: form.location_free_text.trim(),
        evidence_links: form.evidence_links.filter(l => l.trim()).slice(0,10),
        consent_for_followup: form.consent_for_followup,
      };
      const data = await apiRequest('/api/reports/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setSubmittedData(data);
      addToast('Report submitted anonymously.', 'success');
      // Fetch top helplines after submission
      try {
        const helplineData = await apiRequest('/api/helplines/');
        setHelplines((helplineData || []).slice(0,3));
      } catch {}
      // Reset form except keep incident type, update session draft for review screen
      setForm(prev => ({ ...initialState, incident_type: prev.incident_type }));
      if (onProceed) onProceed();
    } catch(err) {
      setError(err.message || 'Failed to submit report');
      addToast(err.message || 'Submission failed', 'error');
    } finally {
      setSubmitting(false);
      setShowConfirm(false);
    }
  };

  const redactionNotice = piiFound.length > 0 ? `Potential PII detected: ${piiFound.join(', ')}` : null;

  const previewText = viewRedacted ? redactLocal(form.description) : form.description;

  // Keyboard shortcut Ctrl+Enter to open confirmation modal
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!submittedData && !submitting) {
          const validationError = validate();
          if (validationError) {
            setError(validationError);
            addToast(validationError, 'error');
          } else {
            setShowConfirm(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [submittedData, submitting, form]);

  const copyCode = () => {
    if (!submittedData?.confirmation_code) return;
    try {
      navigator.clipboard.writeText(submittedData.confirmation_code);
      addToast('Confirmation code copied', 'success');
    } catch {
      addToast('Could not copy code', 'error');
    }
  };

  return (
    <div className="report-form-wrapper">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Card padding="lg" shadow="lg" className="report-form-card">
        {!submittedData && (
          <form onSubmit={handleFormSubmit} className="report-form" aria-label="Anonymous abuse report form">
            <div className="report-form__group">
              <label htmlFor="incident_type" className="report-form__label">Incident Type</label>
              <select
                id="incident_type"
                name="incident_type"
                value={form.incident_type}
                onChange={handleChange}
                className="report-form__select"
                required
              >
                {incidentTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <div className="report-form__group">
              <label htmlFor="description" className="report-form__label">Description <span className="report-form__label-hint">(avoid names, emails, phone numbers)</span></label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={8}
                className="report-form__textarea"
                placeholder="Describe what happened. Include platforms used (e.g., Instagram DM), type of behaviour, frequency, and any escalation. Do NOT include real names or contact details."
                required
                ref={descRef}
                aria-describedby="description-meta"
              />
              <div className="report-form__meta" id="description-meta">
                <span>{form.description.length} / 5000</span>
                {form.description.length > 0 && form.description.length < 30 && (
                  <span className="report-form__hint">Minimum 30 characters</span>
                )}
              </div>
              {redactionNotice && (
                <div className="report-form__pii-warning" role="alert">
                  {redactionNotice} {form.autoRedact ? 'We will automatically redact these before sending.' : 'Enable auto-redact to remove them.'}
                </div>
              )}
            </div>

            <div className="report-form__group-inline">
              <label className="report-form__checkbox-label">
                <input
                  type="checkbox"
                  name="autoRedact"
                  checked={form.autoRedact}
                  onChange={handleChange}
                />
                <span>Auto‑redact detected PII for safety</span>
              </label>
              <label className="report-form__checkbox-label">
                <input
                  type="checkbox"
                  name="consent_for_followup"
                  checked={form.consent_for_followup}
                  onChange={handleChange}
                />
                <span>Consent for anonymized statistical use</span>
              </label>
            </div>

            <div className="report-form__group">
              <label htmlFor="location_free_text" className="report-form__label">Platform / Context <span className="report-form__label-hint">(e.g., "Facebook group", "WhatsApp chat")</span></label>
              <input
                id="location_free_text"
                name="location_free_text"
                value={form.location_free_text}
                onChange={handleChange}
                className="report-form__input"
                maxLength={200}
                placeholder="Do NOT enter a physical address."
              />
            </div>

            <div className="report-form__group">
              <label className="report-form__label">Evidence Links <span className="report-form__label-hint">(optional – public URLs only)</span></label>
              {form.evidence_links.map((link, idx) => (
                <div key={idx} className="report-form__evidence-row">
                  <input
                    type="url"
                    value={link}
                    placeholder="https://example.com/screenshot"
                    onChange={(e) => updateEvidenceLink(idx, e.target.value)}
                    className="report-form__input"
                  />
                  {form.evidence_links.length > 1 && (
                    <button
                      type="button"
                      className="report-form__remove-link"
                      onClick={() => removeEvidenceLink(idx)}
                      aria-label="Remove evidence link"
                    >×</button>
                  )}
                </div>
              ))}
              {form.evidence_links.length < 10 && (
                <Button type="button" variant="outline" size="sm" onClick={addEvidenceLink}>Add Link</Button>
              )}
            </div>

            <div className="report-form__preview-toggle">
              <button
                type="button"
                onClick={() => setShowPreview(p => !p)}
                className="report-form__preview-btn"
              >{showPreview ? 'Hide' : 'Show'} Preview</button>
              {showPreview && (
                <button
                  type="button"
                  onClick={() => setViewRedacted(v => !v)}
                  className="report-form__preview-btn"
                >View {viewRedacted ? 'Original' : 'Redacted'}</button>
              )}
            </div>
            {showPreview && (
              <div className="report-form__preview">
                <strong>Submission Preview ({viewRedacted ? 'Auto‑redacted' : 'Original'})</strong>
                <pre className="report-form__preview-text" aria-live="polite">{previewText || 'Nothing entered yet.'}</pre>
              </div>
            )}

            <div className="report-form__actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                title="Ctrl+Enter to submit"
              >
                {submitting ? 'Submitting…' : 'Submit Report Securely'}
              </Button>
            </div>

            {error && <div className="report-form__error" role="alert">{error}</div>}
          </form>
        )}

        {submitting && <LoadingSpinner size="md" label="Submitting report" />}

        {submittedData && (
          <div className="report-form__confirmation" aria-live="polite">
            <h2>Report Submitted</h2>
            <p>Your confirmation code is:</p>
            <div className="report-form__code" role="status">{submittedData.confirmation_code}</div>
            <p className="report-form__note">Save this code offline. We cannot recover it later.</p>
            <div className="report-form__copy-row">
              <Button variant="outline" size="sm" onClick={copyCode}>Copy Code</Button>
            </div>
            {submittedData.redaction_applied && (
              <div className="report-form__redaction-msg">{submittedData.redaction_message}</div>
            )}
            {helplines.length > 0 && (
              <div className="report-form__helplines">
                <h3>Immediate Support</h3>
                <ul>
                  {helplines.map(h => (
                    <li key={h.id} className="report-form__helpline-item">
                      <strong>{h.name}</strong> – {h.phone_number}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="report-form__post-actions">
              <Button variant="secondary" onClick={() => setSubmittedData(null)}>Submit Another Report</Button>
            </div>
          </div>
        )}
      </Card>
      {showConfirm && !submittedData && (
        <div className="report-form__modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="report-form__modal-content">
            <h3 id="confirm-title">Confirm Anonymous Submission</h3>
            <p className="report-form__modal-text">Please review your description below. Personal details will {form.autoRedact ? 'be' : 'not be'} automatically redacted. Submissions cannot be edited later.</p>
            <div className="report-form__modal-preview">
              <pre>{form.autoRedact ? redactLocal(form.description) : form.description}</pre>
            </div>
            <div className="report-form__modal-actions">
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant="primary" onClick={executeSubmit} disabled={submitting}>{submitting ? 'Submitting…' : 'Confirm & Submit'}</Button>
            </div>
            <p className="report-form__modal-footnote">Tip: You can press Ctrl+Enter anytime to open this confirmation.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
