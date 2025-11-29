# Person D Handoff - Emergency Help and Support Hub

## Overview

Welcome, Person D! You'll be implementing the Emergency Help and Support Hub for ShieldHer. This feature provides critical resources including a searchable helpline directory, AI chatbot UI, donation system, and resource hub.

## What's Been Done

**Person A** built the complete Django + React foundation with authentication, database models, PII detection, and design system.

**Person B** implemented the digital literacy module with lessons, progress tracking, and gamification.

**Person C** built the anonymous reporting system with privacy-first design, panic exit, and history hiding.

**Person D (You)** will now build the emergency support hub with helplines, chatbot, donations, and resources.

## Your Spec Files

All your requirements, design, and tasks are documented in:

- `.kiro/specs/emergency-support-hub/requirements.md` - User stories and acceptance criteria
- `.kiro/specs/emergency-support-hub/design.md` - Architecture, components, and correctness properties
- `.kiro/specs/emergency-support-hub/tasks.md` - Step-by-step implementation plan

## Getting Started

### 1. Review the Spec

Read through the requirements and design documents to understand what you're building.

### 2. Start with Task 1

Open `.kiro/specs/emergency-support-hub/tasks.md` and click "Start task" next to task 1.1 to begin implementation.

### 3. Follow the Task Order

The tasks are designed to build incrementally:

1. Backend resources app (helplines, resources)
2. Backend donations app
3. Mock chatbot API
4. Frontend hooks for data fetching
5. Frontend components (cards, forms, chatbot window)
6. Frontend pages (Helplines, ChatSupport, Donations, Resources)
7. Navigation and routing
8. Offline caching
9. Final integration

### 4. Use Existing Infrastructure

**Design Tokens** (already created by Person A):

```javascript
// frontend/src/styles/design-tokens.js
export const colors = {
  primary: '#8B5CF6',
  secondary: '#EC4899',
  // ... more colors
};
```

**Common Components** (already created):

- `Button` - frontend/src/components/common/Button/
- `Card` - frontend/src/components/common/Card/
- `Input` - frontend/src/components/common/Input/

**API Utility** (already created):

```javascript
// frontend/src/utils/api.js
import { apiRequest } from '../utils/api';

const helplines = await apiRequest('/api/helplines/');
```

**Backend Core Utilities** (already created):

- PII detection: `backend/apps/core/utils.py`
- Permissions: `backend/apps/core/permissions.py`
- Logging: `backend/apps/core/logging.py`

## Key Implementation Notes

### Backend Structure

You'll be working with two Django apps:

**resources app** (backend/apps/resources/):

- Helpline model and API
- Resource model and API
- Mock chatbot endpoint

**donations app** (backend/apps/donations/):

- Donation model and API
- Mock payment processor

### Frontend Structure

You'll create:

**Pages** (frontend/src/pages/emergency/):

- Helplines.jsx
- ChatSupport.jsx
- Donations.jsx
- Resources.jsx (if not already in resources folder)

**Components** (frontend/src/components/emergency/):

- HelplineCard.jsx
- ChatbotWindow.jsx
- DonationForm.jsx
- ResourceCard.jsx

**Hooks** (frontend/src/hooks/):

- useHelplines.js
- useResources.js
- useDonations.js
- useChatbot.js
- useOfflineCache.js

### Critical Features

1. **Offline Caching**: Helplines must be accessible offline using localStorage
2. **Accessibility**: All components must meet WCAG 2.1 Level AA (44x44px touch targets, proper ARIA labels)
3. **Privacy**: Use PII detection for donation messages, never store sensitive payment data
4. **Mock APIs**: Chatbot and payment processing use simple mocks (extensible for future real integration)

### Mock Implementations

**Chatbot Pattern Matching**:

```python
CHATBOT_RESPONSES = {
    'crisis': "If you're in immediate danger, call 911 or 1-800-799-7233",
    'legal': "Check our Resources page for legal aid organizations",
    'shelter': "Call the National Domestic Violence Hotline at 1-800-799-7233",
    'default': "I'm here to help. Ask me about crisis support, legal help, or shelters."
}
```

**Mock Payment Processor**:

```python
def process_payment(amount, payment_method):
    return {
        'success': True,
        'payment_intent_id': f'pi_mock_{int(time.time())}',
        'status': 'completed'
    }
```

## Database Migrations

After creating models, run migrations:

**Windows**:

```cmd
cd backend
python manage.py makemigrations resources
python manage.py makemigrations donations
python manage.py migrate
```

**Linux/Mac**:

```bash
cd backend
./scripts/create_migrations.sh
```

## Testing Your Work

### Backend Testing

```cmd
cd backend
pytest apps/resources/tests/
pytest apps/donations/tests/
```

### Frontend Testing

```cmd
cd frontend
npm test
```

### Manual Testing

1. Start backend: `cd backend && python manage.py runserver`
2. Start frontend: `cd frontend && npm start`
3. Visit <http://localhost:3000/emergency/helplines>

## Design Guidelines

### Colors (from design tokens)

- Primary: Purple (#8B5CF6) - main actions
- Secondary: Pink (#EC4899) - accents
- Success: Green (#10B981) - confirmations
- Danger: Red (#EF4444) - errors, emergency
- Warning: Amber (#F59E0B) - cautions

### Typography

- Headings: 24px, 20px, 18px (font-semibold)
- Body: 16px minimum (font-normal)
- Small: 14px (font-normal)

### Spacing

- Touch targets: 44x44px minimum
- Form field spacing: 16px (space-y-4)
- Card padding: 24px (p-6)
- Section spacing: 32px (space-y-8)

### Accessibility Checklist

- [ ] All interactive elements have 44x44px touch targets
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] All buttons have descriptive text or aria-labels
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works logically
- [ ] Screen reader announcements are appropriate

## Common Patterns

### Creating a Django Model

```python
from django.db import models
from apps.core.models import TimeStampedModel

class Helpline(TimeStampedModel):
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50)
    # ... more fields
    
    class Meta:
        ordering = ['-priority', 'name']
    
    def __str__(self):
        return self.name
```

### Creating a DRF ViewSet

```python
from rest_framework import viewsets, filters
from apps.core.permissions import IsAdminOrReadOnly

class HelplineViewSet(viewsets.ModelViewSet):
    queryset = Helpline.objects.filter(is_active=True)
    serializer_class = HelplineSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category']
```

### Creating a React Hook

```javascript
import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

export const useHelplines = (searchQuery = '') => {
  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelplines = async () => {
      try {
        const data = await apiRequest(`/api/helplines/?search=${searchQuery}`);
        setHelplines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHelplines();
  }, [searchQuery]);

  return { helplines, loading, error };
};
```

### Creating a React Component

```javascript
import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import './HelplineCard.css';

export const HelplineCard = ({ name, phoneNumber, description, availability }) => {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Card className="helpline-card">
      <h3 className="helpline-card__title">{name}</h3>
      <p className="helpline-card__description">{description}</p>
      <p className="helpline-card__availability">{availability}</p>
      <Button 
        variant="primary" 
        onClick={handleCall}
        aria-label={`Call ${name} at ${phoneNumber}`}
      >
        Call {phoneNumber}
      </Button>
    </Card>
  );
};
```

## Troubleshooting

### Import Errors

Make sure Django apps are registered in `backend/config/settings/base.py`:

```python
INSTALLED_APPS = [
    # ...
    'apps.resources',
    'apps.donations',
]
```

### CORS Issues

CORS is already configured in settings for localhost:3000

### Database Issues

Reset database if needed:

```cmd
cd backend
python manage.py flush
python manage.py migrate
python manage.py createsuperuser
```

## Next Steps After Completion

1. Test all features thoroughly
2. Run accessibility audit
3. Update IMPLEMENTATION_SUMMARY.md with your changes
4. Create sample data for demo purposes
5. Document any issues or future enhancements

## Questions?

If you encounter issues:

1. Check the design document for architecture details
2. Review existing code from Person A, B, and C for patterns
3. Refer to Django and React documentation
4. Ask for clarification if requirements are unclear

## Success Criteria

Your implementation is complete when:

- [ ] All non-optional tasks are completed
- [ ] Backend APIs return correct data
- [ ] Frontend pages render and function correctly
- [ ] Offline caching works for helplines
- [ ] Accessibility requirements are met
- [ ] Integration with existing ShieldHer components works
- [ ] Mock chatbot and payment systems function

Good luck! You're building a critical feature that could help save lives. 💜
