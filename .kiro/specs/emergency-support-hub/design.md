# Emergency Help and Support Hub - Design Document

## Overview

The Emergency Help and Support Hub is a critical feature of the ShieldHer platform that provides immediate access to life-saving resources. The design emphasizes rapid access to information, offline capability for essential helpline data, trauma-informed UI patterns, and seamless integration with the existing Django + React architecture.

The hub consists of four main components:
1. **Helpline Directory**: Searchable database of emergency contact numbers with offline caching
2. **Chat Support Interface**: Frontend chatbot UI connected to a mock API for automated guidance
3. **Donation System**: Simple payment integration for platform support
4. **Resource Hub**: Comprehensive database of legal information, rights, and support organizations

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
├─────────────────────────────────────────────────────────────┤
│  Pages:                                                      │
│  - Helplines.jsx          - ChatSupport.jsx                 │
│  - Donations.jsx          - Resources.jsx                   │
│                                                              │
│  Components:                                                 │
│  - HelplineCard.jsx       - ChatbotWindow.jsx               │
│  - DonationForm.jsx       - ResourceCard.jsx                │
│                                                              │
│  Hooks:                                                      │
│  - useHelplines.js        - useChatbot.js                   │
│  - useDonations.js        - useResources.js                 │
│  - useOfflineCache.js                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Django + DRF)                     │
├─────────────────────────────────────────────────────────────┤
│  Apps:                                                       │
│  - resources/             - donations/                      │
│                                                              │
│  Models:                                                     │
│  - Helpline               - Resource                        │
│  - Donation               - ChatMessage (mock)              │
│                                                              │
│  Views/Serializers:                                         │
│  - HelplineViewSet        - ResourceViewSet                 │
│  - DonationViewSet        - ChatbotView (mock)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │  PostgreSQL  │
                      └──────────────┘
```

### Technology Stack

**Frontend:**
- React 18+ with functional components and hooks
- TailwindCSS with existing design tokens
- LocalStorage API for offline caching
- Fetch API via centralized api.js utility

**Backend:**
- Django 4.2+ with Django REST Framework
- PostgreSQL database
- Existing authentication and permission system
- Mock chatbot responses (extensible for future AI integration)

## Components and Interfaces

### Backend Models

#### Helpline Model
```python
class Helpline(models.Model):
    name = CharField(max_length=200)
    phone_number = CharField(max_length=50)
    description = TextField()
    category = CharField(choices=CATEGORY_CHOICES)
    availability = CharField(max_length=200)
    is_24_7 = BooleanField(default=False)
    languages = JSONField(default=list)
    is_active = BooleanField(default=True)
    priority = IntegerField(default=0)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

#### Resource Model
```python
class Resource(models.Model):
    title = CharField(max_length=300)
    description = TextField()
    content = TextField()
    category = CharField(choices=RESOURCE_CATEGORIES)
    resource_type = CharField(choices=TYPE_CHOICES)
    external_url = URLField(blank=True)
    is_published = BooleanField(default=True)
    tags = JSONField(default=list)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

#### Donation Model
```python
class Donation(models.Model):
    amount = DecimalField(max_digits=10, decimal_places=2)
    currency = CharField(max_length=3, default='USD')
    donor_email = EmailField(blank=True)
    is_anonymous = BooleanField(default=False)
    status = CharField(choices=STATUS_CHOICES)
    payment_intent_id = CharField(max_length=255, unique=True)
    message = TextField(blank=True)
    created_at = DateTimeField(auto_now_add=True)
```

### API Endpoints

#### Helplines API
- `GET /api/helplines/` - List all active helplines (supports search, filtering)
- `GET /api/helplines/{id}/` - Retrieve specific helpline details
- `POST /api/helplines/` - Create helpline (admin only)
- `PUT /api/helplines/{id}/` - Update helpline (admin only)
- `DELETE /api/helplines/{id}/` - Delete helpline (admin only)

#### Resources API
- `GET /api/resources/` - List published resources (supports search, category filter)
- `GET /api/resources/{id}/` - Retrieve specific resource
- `POST /api/resources/` - Create resource (admin only)
- `PUT /api/resources/{id}/` - Update resource (admin only)
- `DELETE /api/resources/{id}/` - Delete resource (admin only)

#### Donations API
- `POST /api/donations/` - Create donation and initiate payment
- `GET /api/donations/{id}/` - Retrieve donation status
- `GET /api/donations/` - List donations (admin only)

#### Chatbot API (Mock)
- `POST /api/chatbot/message/` - Send message and receive mock response

### Frontend Components

#### HelplineCard Component
```jsx
<HelplineCard
  name="National Domestic Violence Hotline"
  phoneNumber="1-800-799-7233"
  description="24/7 support for survivors"
  availability="24/7"
  category="crisis"
  languages={['English', 'Spanish']}
  onCall={handleCall}
/>
```

#### ChatbotWindow Component
```jsx
<ChatbotWindow
  messages={chatHistory}
  onSendMessage={handleSendMessage}
  isLoading={isProcessing}
/>
```

#### DonationForm Component
```jsx
<DonationForm
  onSubmit={handleDonation}
  suggestedAmounts={[10, 25, 50, 100]}
  isProcessing={isProcessing}
/>
```

#### ResourceCard Component
```jsx
<ResourceCard
  title="Know Your Rights"
  description="Legal protections for survivors"
  category="legal"
  onView={handleViewResource}
/>
```

## Data Models

### Helpline Categories
- `crisis` - Immediate crisis support
- `legal` - Legal assistance
- `counseling` - Mental health support
- `shelter` - Housing assistance
- `medical` - Medical services
- `other` - Other support services

### Resource Categories
- `legal_rights` - Legal information and rights
- `safety_planning` - Safety planning resources
- `organizations` - Support organizations
- `laws` - Relevant laws and legislation
- `financial` - Financial assistance information
- `healthcare` - Healthcare resources

### Donation Status
- `pending` - Payment initiated
- `completed` - Payment successful
- `failed` - Payment failed
- `refunded` - Payment refunded

### Offline Cache Structure
```javascript
{
  helplines: [
    {
      id: 1,
      name: "...",
      phoneNumber: "...",
      // ... other fields
    }
  ],
  lastUpdated: "2024-01-15T10:30:00Z",
  version: 1
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Search and Filtering Properties

**Property 1: Helpline search accuracy**
*For any* search query and helpline dataset, all returned helplines should match the search criteria in their name, description, or category fields.
**Validates: Requirements 1.2**

**Property 2: Resource search accuracy**
*For any* search query and resource dataset, all returned resources should match the search criteria in their title, description, content, or tags.
**Validates: Requirements 4.4**

**Property 3: Category filtering completeness**
*For any* selected category, all returned resources should belong to that category and no resources from that category should be excluded.
**Validates: Requirements 4.2**

### Data Display Properties

**Property 4: Helpline information completeness**
*For any* helpline entry, the rendered display should contain the helpline name, phone number, availability hours, and description.
**Validates: Requirements 1.3**

**Property 5: Resource information completeness**
*For any* resource entry, the rendered display should contain the resource title, description, content, and relevant links.
**Validates: Requirements 4.3**

**Property 6: Chat message formatting**
*For any* chatbot message, the rendered output should include a timestamp and sender identification.
**Validates: Requirements 2.3**

### Interaction Properties

**Property 7: Phone call initiation**
*For any* phone number displayed in a helpline card, clicking the number should trigger the tel: protocol with the correct phone number.
**Validates: Requirements 1.4**

**Property 8: Chatbot response consistency**
*For any* valid message sent to the chatbot, the system should return a response within a reasonable timeframe.
**Validates: Requirements 2.2**

**Property 9: Chat history ordering**
*For any* sequence of chat messages, they should be displayed in chronological order based on their timestamps.
**Validates: Requirements 2.4**

**Property 10: Session persistence**
*For any* chat conversation, closing and reopening the chat window within the same session should preserve all messages.
**Validates: Requirements 2.5**

### Form Validation Properties

**Property 11: Donation form validation**
*For any* invalid donation form data (negative amounts, missing required fields), the system should reject submission and display appropriate validation errors.
**Validates: Requirements 3.4**

**Property 12: Valid donation processing**
*For any* valid donation form submission, the system should process the payment and display a confirmation message.
**Validates: Requirements 3.3**

**Property 13: Payment data privacy**
*For any* successfully processed donation, the stored database record should not contain sensitive payment information (card numbers, CVV, etc.).
**Validates: Requirements 3.5**

### Admin Operations Properties

**Property 14: Helpline creation validation**
*For any* helpline creation attempt, the system should validate all required fields before storing the data.
**Validates: Requirements 7.1**

**Property 15: Resource update persistence**
*For any* resource update by an administrator, the changes should be saved to the database and reflected in user-facing displays.
**Validates: Requirements 7.2**

**Property 16: Donation record privacy**
*For any* donation record displayed to administrators, sensitive payment details should be excluded or masked.
**Validates: Requirements 7.3**

**Property 17: Deletion completeness**
*For any* helpline or resource deleted by an administrator, it should be removed from both the database and all user-facing displays.
**Validates: Requirements 7.4**

**Property 18: Admin audit logging**
*For any* administrative action (create, update, delete), an audit log entry should be created with the action type, timestamp, and administrator identifier.
**Validates: Requirements 7.5**

### Accessibility Properties

**Property 19: Touch target sizing**
*For any* interactive element (buttons, links, form inputs), the touch target should be at least 44x44 pixels.
**Validates: Requirements 5.1**

**Property 20: Text size compliance**
*For any* body text element, the font size should be at least 16px.
**Validates: Requirements 5.2**

**Property 21: Keyboard focus visibility**
*For any* interactive element, keyboard focus should produce a visible focus indicator.
**Validates: Requirements 6.1**

**Property 22: ARIA labeling completeness**
*For any* interactive component, it should have appropriate ARIA labels or semantic HTML that conveys its purpose.
**Validates: Requirements 6.2**

**Property 23: Logical tab order**
*For any* page in the emergency hub, tabbing through interactive elements should follow a logical, sequential order.
**Validates: Requirements 6.3**

**Property 24: Error announcement**
*For any* form submission with validation errors, the errors should be announced to screen readers via ARIA live regions or focus management.
**Validates: Requirements 6.5**

### Integration Properties

**Property 25: Design token consistency**
*For any* emergency hub component, it should use colors, spacing, and typography from the established design token system.
**Validates: Requirements 8.1**

**Property 26: API utility usage**
*For any* API request made by emergency hub features, it should use the centralized API utility from utils/api.js.
**Validates: Requirements 8.2**

**Property 27: Authentication state respect**
*For any* protected emergency hub feature, access should be controlled based on the user's authentication state.
**Validates: Requirements 8.4**

## Error Handling

### Frontend Error Handling

**Network Errors:**
- Display user-friendly error messages when API calls fail
- Provide retry mechanisms for failed requests
- Fall back to cached data when available (helplines)
- Never expose technical error details to users

**Validation Errors:**
- Display inline validation errors on form fields
- Prevent form submission until all errors are resolved
- Provide clear, actionable error messages
- Announce errors to screen readers

**Offline Handling:**
- Detect offline state and display appropriate messaging
- Serve cached helpline data when offline
- Queue donation attempts for retry when connection is restored
- Disable features that require connectivity (chatbot, resources)

### Backend Error Handling

**Input Validation:**
- Validate all incoming data using DRF serializers
- Return 400 Bad Request with detailed validation errors
- Sanitize user inputs to prevent injection attacks
- Use the existing PII detection for donation messages

**Database Errors:**
- Catch and log database exceptions
- Return 500 Internal Server Error with safe messages
- Use database transactions for donation processing
- Implement retry logic for transient failures

**Payment Processing Errors:**
- Handle payment gateway failures gracefully
- Store failed payment attempts for debugging
- Never expose payment gateway errors to users
- Implement idempotency for payment requests

**Permission Errors:**
- Return 403 Forbidden for unauthorized admin actions
- Log permission violations for security monitoring
- Use existing permission classes from core app
- Maintain audit trail of access attempts

## Testing Strategy

### Unit Testing

**Backend Unit Tests:**
- Model validation tests for Helpline, Resource, and Donation models
- Serializer tests for data transformation and validation
- View tests for API endpoint behavior
- Permission tests for admin-only operations
- Mock payment gateway responses for donation tests

**Frontend Unit Tests:**
- Component rendering tests for all emergency hub components
- Hook tests for data fetching and state management
- Utility function tests for offline caching
- Form validation logic tests
- Event handler tests for user interactions

### Property-Based Testing

The system will use **Hypothesis** for Python backend property tests and **fast-check** for JavaScript frontend property tests. Each property-based test should run a minimum of 100 iterations.

**Backend Property Tests:**
- Search filtering properties (Properties 1, 2, 3)
- Data validation properties (Properties 11, 13, 14)
- Admin operation properties (Properties 15, 16, 17, 18)
- Each test must be tagged with: `# Feature: emergency-support-hub, Property X: [property text]`

**Frontend Property Tests:**
- Display completeness properties (Properties 4, 5, 6)
- Interaction properties (Properties 7, 8, 9, 10)
- Accessibility properties (Properties 19, 20, 21, 22, 23, 24)
- Integration properties (Properties 25, 26, 27)
- Each test must be tagged with: `// Feature: emergency-support-hub, Property X: [property text]`

### Integration Testing

- End-to-end tests for complete user flows (search helpline → call)
- API integration tests for frontend-backend communication
- Offline mode tests for cached data access
- Payment flow tests with mock payment gateway
- Admin workflow tests for content management

### Accessibility Testing

- Automated accessibility tests using jest-axe or similar
- Keyboard navigation tests for all interactive elements
- Screen reader compatibility tests
- Color contrast validation
- Touch target size validation

## Implementation Notes

### Offline Caching Strategy

1. **Initial Load**: Fetch all helplines and store in localStorage
2. **Background Sync**: Update cache when online every 24 hours
3. **Cache Versioning**: Include version number to handle schema changes
4. **Fallback**: Always attempt network request first, fall back to cache on failure

### Chatbot Mock Implementation

For the initial implementation, the chatbot will use a simple pattern-matching system:

```python
CHATBOT_RESPONSES = {
    'crisis': "If you're in immediate danger, please call 911 or the National Domestic Violence Hotline at 1-800-799-7233.",
    'legal': "For legal assistance, check our Resources page for legal aid organizations in your area.",
    'shelter': "For emergency shelter, please call the National Domestic Violence Hotline at 1-800-799-7233.",
    'default': "I'm here to help. You can ask me about crisis support, legal help, shelters, or other resources."
}
```

This can be extended in the future to integrate with actual AI services.

### Payment Integration

The donation system will use a mock payment API for the initial implementation. The structure is designed to easily integrate with Stripe or similar payment processors:

```javascript
// Mock payment API
const processPayment = async (amount, paymentMethod) => {
  // Simulate API call
  return {
    success: true,
    paymentIntentId: `pi_mock_${Date.now()}`,
    status: 'completed'
  };
};
```

### Security Considerations

1. **PII Protection**: Use existing PII detection for donation messages
2. **Payment Security**: Never store full card numbers or CVV codes
3. **Admin Access**: Require authentication for all admin operations
4. **Audit Logging**: Log all admin actions using existing logging system
5. **Rate Limiting**: Implement rate limiting on donation endpoints
6. **Input Sanitization**: Sanitize all user inputs to prevent XSS attacks

### Performance Considerations

1. **Lazy Loading**: Load resources and helplines on demand
2. **Pagination**: Implement pagination for large resource lists
3. **Caching**: Cache helpline data for offline access
4. **Debouncing**: Debounce search inputs to reduce API calls
5. **Code Splitting**: Split emergency hub code into separate bundle

### Mobile Optimization

1. **Touch Targets**: Minimum 44x44px for all interactive elements
2. **Font Sizes**: Minimum 16px for body text to prevent zoom
3. **Viewport**: Use responsive viewport meta tag
4. **Gestures**: Support swipe gestures for navigation
5. **Performance**: Optimize images and minimize bundle size
