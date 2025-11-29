# Task Checklist Template

Use this template to document your work before handoff to other team members.

---

## Task Information

**Title:** [Person]-[Feature]  
**Branch:** feature/[person]-[feature]  
**Completed by:** [Your Name]  
**Date/Time:** [YYYY-MM-DD HH:MM]  
**Handoff to:** [Next Person]

---

## Files Changed

List all files created, modified, or deleted:

### Created
- [ ] `path/to/new/file.py`
- [ ] `path/to/another/file.jsx`

### Modified
- [ ] `path/to/existing/file.py`
- [ ] `path/to/another/existing/file.jsx`

### Deleted
- [ ] `path/to/removed/file.py`

---

## New Endpoints Added

Document any new API endpoints:

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| GET | `/api/example/` | No | Example endpoint |
| POST | `/api/example/` | Yes (Admin) | Create example |

---

## Tests

### Unit Tests
- [ ] All unit tests pass
- [ ] New unit tests added for new functionality
- [ ] Coverage: [X]%

### Property-Based Tests (if applicable)
- [ ] Property tests pass
- [ ] Minimum 100 iterations configured

### Test Commands
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

---

## Linting & Code Quality

- [ ] Backend: `flake8` or `black` passed
- [ ] Frontend: `eslint` passed
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks

---

## Commands to Run Locally

Provide step-by-step commands for the next person:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies (if needed)
cd backend && pip install -r requirements/development.txt
cd frontend && npm install

# 3. Run migrations (if database changes)
python manage.py migrate

# 4. Start services
docker-compose up -d

# 5. Test the feature
# [Specific testing steps]
```

---

## Privacy & Security Validation

Answer these questions:

- [ ] **Does this feature collect any data?** [Yes/No]
  - If yes, what data? [Describe]
  - Is it encrypted? [Yes/No]
  - Is it PII? [Yes/No - If yes, explain why it's necessary]

- [ ] **Are error messages safe?** (No stack traces, no internal details)
- [ ] **Are rate limits configured?** (For public endpoints)
- [ ] **Are admin actions logged?** (For audit trail)
- [ ] **No IP addresses logged for anonymous users?**
- [ ] **No persistent cookies for anonymous users?**

---

## Accessibility Notes

- [ ] All interactive elements have minimum 44px touch targets
- [ ] All interactive elements are keyboard accessible
- [ ] All images have alt text
- [ ] All form inputs have proper labels
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] Proper ARIA attributes used
- [ ] Semantic HTML used (nav, main, article, etc.)
- [ ] Focus states visible

---

## Documentation Updates

- [ ] README.md updated (if needed)
- [ ] API documentation updated (if new endpoints)
- [ ] Design system documentation updated (if new components)
- [ ] Code comments added for complex logic

---

## Smoke Test Results

Perform these basic checks:

- [ ] Application starts without errors
- [ ] Health check endpoint returns 200 OK: `curl http://localhost:8000/api/health/`
- [ ] Frontend loads without console errors
- [ ] New feature works as expected
- [ ] Existing features still work (no regressions)

---

## Known Issues / TODOs

List any known issues or future improvements:

1. [Issue description]
2. [TODO item]

---

## Additional Notes

Any other information the next person should know:

[Your notes here]

---

## Handoff Checklist

Before marking complete:

- [ ] All tests pass
- [ ] Code is committed and pushed
- [ ] PR created (if using PRs)
- [ ] This checklist is complete
- [ ] Next person notified

---

**Signature:** [Your Name]  
**Date:** [YYYY-MM-DD]
