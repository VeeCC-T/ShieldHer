# Design Document

## Overview

The ShieldHer project foundation establishes a secure, scalable, privacy-first architecture for a mobile-first digital literacy and safety platform. The system uses a modern web stack with React + Vite + TailwindCSS on the frontend and Node.js + Express + PostgreSQL on the backend. The design prioritizes anonymous access for public users, trauma-informed UX, accessibility, and clear separation of concerns to enable multiple contributors to work independently without conflicts.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (React + Vite + TailwindCSS - Mobile-First Responsive)    │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/REST
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     API Gateway Layer                        │
│         (Express + Rate Limiting + CORS + Helmet)           │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌───▼────────┐ ┌─▼──────────────┐
│ Public Routes│ │Auth Routes │ │ Admin Routes   │
│ (Anonymous)  │ │ (JWT Gen)  │ │ (JWT Required) │
└───────┬──────┘ └───┬────────┘ └─┬──────────────┘
        │            │              │
        └────────────┼──────────────┘
                     │
        ┌────────────▼────────────┐
        │   Business Logic Layer  │
        │      (Controllers)      │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │    Data Access Layer    │
        │  (Models + ORM/Sequelize)│
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │   PostgreSQL Database   │
        │  (Encrypted Sensitive)  │
        └─────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18+ with Vite for fast development and optimized builds
- TailwindCSS 3+ for utility-first styling with custom design tokens
- React Router for client-side routing
- Axios for HTTP requests with interceptors

**Backend:**
- Node.js 18+ LTS
- Express 4+ for REST API
- Sequelize ORM for PostgreSQL interactions
- jsonwebtoken for JWT authentication
- bcrypt for password hashing
- helmet for security headers
- express-rate-limit for rate limiting
- cors for cross-origin resource sharing

**Database:**
- PostgreSQL 15+ for relational data storage
- pg-crypto for field-level encryption

**DevOps:**
- Docker + docker-compose for containerization
- Environment-based configuration (.env files)

### Folder Structure

```
shieldher/
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI kit components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── features/        # Feature-specific components
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Academy.jsx
│   │   │   ├── Report.jsx
│   │   │   ├── Resources.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Donate.jsx
│   │   │   └── admin/
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── validation.js
│   │   ├── styles/
│   │   │   └── design-tokens.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── lessons.routes.js
│   │   │   ├── reports.routes.js
│   │   │   ├── resources.routes.js
│   │   │   ├── donations.routes.js
│   │   │   └── ai.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── lessons.controller.js
│   │   │   ├── reports.controller.js
│   │   │   ├── resources.controller.js
│   │   │   ├── donations.controller.js
│   │   │   └── ai.controller.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── Admin.model.js
│   │   │   ├── Lesson.model.js
│   │   │   ├── Report.model.js
│   │   │   ├── Resource.model.js
│   │   │   └── Donation.model.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── rateLimiter.middleware.js
│   │   │   ├── errorHandler.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   └── env.js
│   │   ├── utils/
│   │   │   ├── encryption.js
│   │   │   ├── piiDetection.js
│   │   │   └── logger.js
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .gitignore
├── README.md
└── TASK_CHECKLIST.md
```

## Components and Interfaces

### Frontend Components

#### Design Tokens (design-tokens.js)

```javascript
export const colors = {
  primary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',  // Main primary
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Main secondary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#ffffff',
  surface: '#f9fafb',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Poppins', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
};
```

#### Button Component

```jsx
// Props: variant, size, children, onClick, disabled, type, ariaLabel
// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
// Accessibility: proper aria-label, keyboard navigation, focus states
// Mobile: min-height 44px for touch targets
```

#### Card Component

```jsx
// Props: children, padding, shadow, hover, onClick
// Features: consistent border-radius, shadow levels, hover states
// Accessibility: semantic article/section tags, proper heading hierarchy
```

#### Input Component

```jsx
// Props: type, label, value, onChange, error, placeholder, required, disabled
// Features: floating labels, error states, validation feedback
// Accessibility: proper label association, aria-invalid, aria-describedby
// Mobile: appropriate input types (tel, email, url), large touch targets
```

#### Modal Component

```jsx
// Props: isOpen, onClose, title, children, size
// Features: backdrop, close button, escape key handler, focus trap
// Accessibility: role="dialog", aria-modal, focus management
// Mobile: full-screen on small devices, slide-up animation
```

#### Navbar Component

```jsx
// Props: user (for admin), onLogout
// Features: responsive menu, mobile hamburger, logo, navigation links
// Accessibility: nav landmark, aria-current for active page
// Mobile: collapsible menu, touch-friendly spacing
```

#### Footer Component

```jsx
// Props: none (static content)
// Features: links to resources, privacy policy, emergency exit button
// Accessibility: footer landmark, clear link text
// Mobile: stacked layout, large emergency button
```

### Backend API Interfaces

#### Health Check Endpoint

```
GET /api/health
Response: 200 OK
{
  "status": "ok",
  "timestamp": "2025-11-28T10:30:00Z",
  "database": "connected"
}
```

#### Authentication Endpoints

```
POST /api/auth/login
Request:
{
  "username": "admin@shieldher.org",
  "password": "securePassword123"
}
Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "admin@shieldher.org",
    "role": "admin"
  }
}
```

#### Lessons Endpoints

```
GET /api/lessons
Response: 200 OK
{
  "lessons": [
    {
      "id": "uuid",
      "title": "Understanding Digital Privacy",
      "description": "Learn about protecting your personal information online",
      "category": "privacy",
      "duration_minutes": 15,
      "difficulty": "beginner",
      "content_url": "/lessons/privacy-basics",
      "created_at": "2025-11-28T10:00:00Z"
    }
  ]
}

GET /api/lessons/:id
Response: 200 OK
{
  "id": "uuid",
  "title": "Understanding Digital Privacy",
  "description": "...",
  "category": "privacy",
  "duration_minutes": 15,
  "difficulty": "beginner",
  "content": { /* structured lesson content */ },
  "quiz": [ /* quiz questions */ ]
}

POST /api/admin/lessons (Admin only)
Request:
{
  "title": "New Lesson",
  "description": "...",
  "category": "safety",
  "duration_minutes": 20,
  "difficulty": "intermediate",
  "content": { /* structured content */ }
}
```

#### Reports Endpoints

```
POST /api/reports (Public - Anonymous)
Request:
{
  "incident_type": "harassment",
  "description": "Description of incident without PII",
  "timestamp": "2025-11-28T09:00:00Z",
  "location_free_text": "Social media platform",
  "evidence_links": ["https://example.com/screenshot.png"],
  "consent_for_followup": false
}
Response: 201 Created
{
  "confirmation_code": "SH-2025-A7B9C2",
  "message": "Your report has been submitted securely and anonymously."
}

GET /api/admin/reports (Admin only)
Response: 200 OK
{
  "reports": [
    {
      "id": "uuid",
      "incident_type": "harassment",
      "description": "[REDACTED if PII detected]",
      "timestamp": "2025-11-28T09:00:00Z",
      "location_free_text": "Social media platform",
      "evidence_links": ["https://example.com/screenshot.png"],
      "consent_for_followup": false,
      "created_at": "2025-11-28T09:05:00Z",
      "redaction_applied": true
    }
  ]
}
```

#### Resources Endpoints

```
GET /api/resources
Response: 200 OK
{
  "resources": [
    {
      "id": "uuid",
      "type": "hotline",
      "name": "National Domestic Violence Hotline",
      "description": "24/7 support for survivors",
      "contact": "1-800-799-7233",
      "website": "https://www.thehotline.org",
      "available_24_7": true,
      "languages": ["English", "Spanish"]
    }
  ]
}
```

#### Donations Endpoints

```
POST /api/donations (Public - Anonymous)
Request:
{
  "amount": 50.00,
  "currency": "USD",
  "payment_method_token": "tok_visa_4242" // From payment processor
}
Response: 201 Created
{
  "confirmation_code": "DON-2025-X8Y3Z1",
  "amount": 50.00,
  "currency": "USD",
  "message": "Thank you for your anonymous donation."
}
```

#### AI Chat Endpoints

```
POST /api/ai/chat (Public - Anonymous)
Request:
{
  "message": "I need help with privacy settings",
  "context": "social_media"
}
Response: 200 OK
{
  "response": "I can help you with privacy settings. Here are some steps...",
  "follow_up_options": [
    "How do I block someone?",
    "What should I do if I'm being harassed?",
    "Show me emergency resources"
  ],
  "resources": [
    {
      "title": "Privacy Settings Guide",
      "url": "/resources/privacy-guide"
    }
  ]
}
```

## Data Models

### Admin Model

```javascript
{
  id: UUID (primary key),
  username: STRING (unique, not null),
  password_hash: STRING (not null), // bcrypt hashed
  role: ENUM('admin', 'moderator'),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

### Lesson Model

```javascript
{
  id: UUID (primary key),
  title: STRING (not null),
  description: TEXT,
  category: ENUM('privacy', 'safety', 'security', 'awareness'),
  duration_minutes: INTEGER,
  difficulty: ENUM('beginner', 'intermediate', 'advanced'),
  content: JSONB, // Structured lesson content
  quiz: JSONB, // Quiz questions and answers
  published: BOOLEAN (default false),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

### Report Model

```javascript
{
  id: UUID (primary key),
  confirmation_code: STRING (unique, indexed),
  incident_type: ENUM('harassment', 'stalking', 'impersonation', 'threats', 'other'),
  description: TEXT (encrypted), // Field-level encryption
  timestamp: TIMESTAMP, // When incident occurred
  location_free_text: STRING, // Platform/context, not physical location
  evidence_links: ARRAY<STRING>, // URLs only, no file uploads
  consent_for_followup: BOOLEAN,
  redaction_applied: BOOLEAN (default false),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
// NO fields for name, email, phone, IP address, or user identifiers
```

### Resource Model

```javascript
{
  id: UUID (primary key),
  type: ENUM('hotline', 'legal', 'counseling', 'shelter', 'online'),
  name: STRING (not null),
  description: TEXT,
  contact: STRING, // Phone or email
  website: STRING,
  available_24_7: BOOLEAN,
  languages: ARRAY<STRING>,
  country: STRING,
  published: BOOLEAN (default false),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

### Donation Model

```javascript
{
  id: UUID (primary key),
  confirmation_code: STRING (unique, indexed),
  amount: DECIMAL(10, 2),
  currency: STRING (default 'USD'),
  payment_processor_id: STRING, // External reference
  status: ENUM('pending', 'completed', 'failed'),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
// NO donor PII - completely anonymous
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After analyzing the acceptance criteria, many are structural requirements (file/directory existence, configuration) that are best validated through examples rather than property-based tests. The following properties represent universal behaviors that should hold across all inputs:

### Property 1: File naming consistency
*For any* file in the codebase, if it is a regular file (not a React component), then its name should follow kebab-case format; if it is a React component, then its name should follow PascalCase format.
**Validates: Requirements 1.5**

### Property 2: Touch target accessibility
*For any* UI component rendered in the application, all interactive elements should have a minimum touch target size of 44x44 pixels for mobile accessibility.
**Validates: Requirements 2.5**

### Property 3: ARIA attribute presence
*For any* UI component rendered in the application, all interactive elements should include appropriate ARIA attributes and use semantic HTML tags.
**Validates: Requirements 2.6**

### Property 4: JWT token validation
*For any* JWT token provided to the authentication middleware, if the token is valid and not expired, then the middleware should attach the admin user context to the request; if the token is invalid or expired, then the middleware should reject the request.
**Validates: Requirements 3.3**

### Property 5: Safe error messages
*For any* error that occurs during request processing, the error handling middleware should return a generic, safe error message that does not reveal internal implementation details or stack traces.
**Validates: Requirements 3.4**

### Property 6: No hardcoded secrets
*For any* configuration value that represents a secret (database password, JWT secret, API key), the value should be loaded from environment variables and not hardcoded in the source code.
**Validates: Requirements 3.5**

### Property 7: Public endpoint accessibility
*For any* public endpoint (lessons, reports, resources, donations, AI chat), requests without authentication should succeed and return appropriate responses.
**Validates: Requirements 4.2**

### Property 8: JWT token structure
*For any* successful admin authentication, the generated JWT token should contain user ID and role claims that can be decoded and verified.
**Validates: Requirements 4.3**

### Property 9: Admin route authorization
*For any* admin-protected route, requests with valid JWT tokens should succeed, and requests without valid tokens should return 401 Unauthorized.
**Validates: Requirements 4.4, 4.5**

### Property 10: Anonymous user privacy
*For any* request from an anonymous user, the application logs should not contain IP addresses, device fingerprints, or any personally identifying information.
**Validates: Requirements 4.6**

### Property 11: PII detection in reports
*For any* report submission containing PII patterns (email addresses, phone numbers, names), the validation should detect these patterns and reject or redact the content.
**Validates: Requirements 6.3**

### Property 12: PII redaction logging
*For any* report submission where PII is detected, the system should redact the content and create an audit log entry recording the redaction event.
**Validates: Requirements 6.4**

### Property 13: Unique confirmation codes
*For any* report or donation submission, the system should generate a unique, non-identifying confirmation code that can be used for reference without linking to user identity.
**Validates: Requirements 6.5**

### Property 14: Rate limiting enforcement
*For any* public endpoint, when the number of requests from a single IP exceeds 100 in a 15-minute window, subsequent requests should receive a 429 Too Many Requests response.
**Validates: Requirements 7.1**

### Property 15: Rate limit response format
*For any* request that exceeds rate limits, the response should have status code 429 and include a generic message without revealing system details.
**Validates: Requirements 7.3**

### Property 16: Input sanitization
*For any* user input received by the application, the input should be validated and sanitized to prevent injection attacks before being processed or stored.
**Validates: Requirements 7.5**

### Property 17: Field-level encryption
*For any* sensitive data field (report descriptions, encrypted contact info), when stored in the database, the value should be encrypted at rest and only decryptable with the proper encryption key.
**Validates: Requirements 9.3**

### Property 18: Timestamp auditability
*For any* database model record, the record should include created_at and updated_at timestamp fields that are automatically managed by the ORM.
**Validates: Requirements 9.4**

## Error Handling

### Error Handling Strategy

The application implements a layered error handling approach:

1. **Input Validation Layer**: Validate all inputs at the API boundary using middleware
2. **Business Logic Layer**: Throw specific error types for business rule violations
3. **Data Access Layer**: Handle database errors and connection issues
4. **Global Error Handler**: Catch all errors and return safe, consistent responses

### Error Types

```javascript
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
  }
}
```

### Error Response Format

All errors return a consistent JSON structure:

```json
{
  "error": {
    "message": "A safe, user-friendly error message",
    "code": "ERROR_CODE",
    "status": 400
  }
}
```

**Privacy Rule**: Error messages must never reveal:
- Internal file paths or stack traces
- Database schema or query details
- User existence (use generic "Invalid credentials" instead of "User not found")
- System architecture or technology stack

### PII Detection and Redaction

The system implements automatic PII detection for report submissions:

```javascript
// Patterns to detect
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /\b(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g
};

// Redaction process
1. Scan free-text fields for PII patterns
2. Replace detected PII with [REDACTED]
3. Log redaction event with timestamp and field name (not content)
4. Store redacted version in database
5. Set redaction_applied flag to true
```

## Testing Strategy

### Dual Testing Approach

The ShieldHer foundation requires both unit tests and property-based tests to ensure correctness:

**Unit Tests** verify:
- Specific examples of correct behavior
- Edge cases (empty inputs, boundary values)
- Error conditions and error handling
- Integration between components
- API endpoint responses for known inputs

**Property-Based Tests** verify:
- Universal properties that hold across all inputs
- Security properties (no PII leakage, proper authentication)
- Consistency properties (naming conventions, error formats)
- Invariants (encryption, timestamps, rate limiting)

### Testing Framework Selection

**Frontend Testing:**
- **Vitest** for unit tests (fast, Vite-native)
- **React Testing Library** for component tests
- **fast-check** for property-based testing in JavaScript

**Backend Testing:**
- **Jest** for unit tests
- **Supertest** for API endpoint testing
- **fast-check** for property-based testing

### Property-Based Testing Configuration

Each property-based test must:
- Run a minimum of 100 iterations to ensure statistical coverage
- Use smart generators that constrain inputs to valid ranges
- Include a comment tag referencing the design document property
- Tag format: `// Feature: project-foundation, Property X: [property description]`

### Test Organization

```
frontend/
  src/
    components/
      common/
        Button.test.jsx          # Unit tests
        Button.properties.test.jsx  # Property tests
    utils/
      validation.test.js
      
backend/
  src/
    controllers/
      reports.controller.test.js
    middleware/
      auth.middleware.test.js
      auth.middleware.properties.test.js
    utils/
      piiDetection.test.js
      piiDetection.properties.test.js
```

### Critical Test Coverage Areas

1. **Authentication & Authorization**
   - JWT generation and validation
   - Admin route protection
   - Anonymous access to public routes

2. **Privacy & Security**
   - PII detection and redaction
   - No logging of identifying information
   - Encryption of sensitive fields
   - Rate limiting enforcement

3. **API Contracts**
   - Request/response format validation
   - Error response consistency
   - Status code correctness

4. **UI Accessibility**
   - ARIA attributes presence
   - Touch target sizes
   - Keyboard navigation
   - Semantic HTML

## Security Considerations

### Authentication Security

- Passwords hashed with bcrypt (cost factor 12)
- JWT tokens signed with HS256 algorithm
- Token expiration set to 24 hours
- Refresh token rotation (future enhancement)
- No password reset without admin intervention (admin-only system)

### Data Security

- Field-level encryption for sensitive data using AES-256-GCM
- Encryption keys stored in environment variables, never in code
- Database connections use SSL/TLS in production
- Prepared statements/parameterized queries to prevent SQL injection
- Input sanitization using validator.js and DOMPurify

### Network Security

- CORS configured to allow only trusted origins
- Helmet middleware for security headers:
  - Content-Security-Policy
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Strict-Transport-Security
- Rate limiting on all endpoints
- Request size limits (10MB for file uploads, 100KB for JSON)

### Privacy Protection

- No cookies for anonymous users
- No session storage for anonymous users
- No analytics tracking with user identifiers
- No IP address logging for anonymous requests
- No device fingerprinting
- Clear privacy notices before data collection

### Audit Logging

Admin actions are logged with:
- Admin user ID
- Action type (view, create, update, delete)
- Resource type and ID
- Timestamp
- Success/failure status

Anonymous user actions are NOT logged with identifying information.

## Deployment Considerations

### Environment Variables

Required environment variables:

```bash
# Backend
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://user:password@host:5432/shieldher
JWT_SECRET=<strong-random-secret>
JWT_EXPIRATION=24h
ENCRYPTION_KEY=<32-byte-hex-key>
CORS_ORIGIN=https://shieldher.org
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend
VITE_API_URL=https://api.shieldher.org
VITE_APP_NAME=ShieldHer
```

### Docker Deployment

The application uses multi-stage Docker builds for optimization:

**Frontend Dockerfile:**
1. Build stage: Install dependencies, build with Vite
2. Production stage: Serve with nginx

**Backend Dockerfile:**
1. Build stage: Install dependencies
2. Production stage: Run with Node.js (non-root user)

### Database Migrations

Use Sequelize migrations for schema changes:

```bash
# Create migration
npx sequelize-cli migration:generate --name add-field-to-reports

# Run migrations
npx sequelize-cli db:migrate

# Rollback
npx sequelize-cli db:migrate:undo
```

### Health Checks

Docker health checks configured for all services:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Performance Considerations

### Frontend Optimization

- Code splitting by route
- Lazy loading for non-critical components
- Image optimization (WebP format, responsive sizes)
- CSS purging with TailwindCSS
- Service worker for offline capability (future)

### Backend Optimization

- Database connection pooling (max 20 connections)
- Query optimization with indexes on frequently queried fields
- Response caching for public endpoints (5-minute TTL)
- Compression middleware (gzip/brotli)
- Pagination for list endpoints (default 20 items per page)

### Database Optimization

Indexes on:
- `reports.confirmation_code` (unique)
- `reports.created_at` (for admin filtering)
- `lessons.category` (for filtering)
- `resources.type` (for filtering)
- `donations.confirmation_code` (unique)

## Accessibility Requirements

All UI components must meet WCAG 2.1 Level AA standards:

### Visual Accessibility
- Minimum contrast ratio 4.5:1 for normal text
- Minimum contrast ratio 3:1 for large text
- Text resizable up to 200% without loss of functionality
- No information conveyed by color alone

### Keyboard Accessibility
- All interactive elements keyboard accessible
- Logical tab order
- Visible focus indicators
- Skip navigation links

### Screen Reader Accessibility
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icon buttons
- ARIA live regions for dynamic content
- Alt text for all images

### Mobile Accessibility
- Minimum touch target size: 44x44 pixels
- Adequate spacing between interactive elements
- Responsive text sizing
- Orientation support (portrait and landscape)

## Extension Guidelines for Contributors

### Adding New Features

1. **Create a new app/module**: Don't modify core files
2. **Follow naming conventions**: kebab-case for files, PascalCase for components
3. **Use existing components**: Extend the UI kit, don't create duplicates
4. **Follow API patterns**: Use consistent endpoint structure and response formats
5. **Add tests**: Both unit tests and property tests for new functionality
6. **Update documentation**: Add API docs and README sections

### Adding New API Endpoints

```javascript
// 1. Create route file: backend/src/routes/feature.routes.js
const express = require('express');
const router = express.Router();
const featureController = require('../controllers/feature.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', featureController.list);
router.post('/', authenticate, featureController.create);

module.exports = router;

// 2. Create controller: backend/src/controllers/feature.controller.js
exports.list = async (req, res, next) => {
  try {
    // Implementation
    res.json({ data: [] });
  } catch (error) {
    next(error);
  }
};

// 3. Register in backend/src/routes/index.js
app.use('/api/feature', featureRoutes);
```

### Adding New UI Components

```jsx
// 1. Create component: frontend/src/components/common/NewComponent.jsx
import React from 'react';
import PropTypes from 'prop-types';

const NewComponent = ({ children, variant = 'default', ...props }) => {
  return (
    <div className="new-component" {...props}>
      {children}
    </div>
  );
};

NewComponent.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
};

export default NewComponent;

// 2. Add tests: frontend/src/components/common/NewComponent.test.jsx
// 3. Export from index: frontend/src/components/common/index.js
```

### Privacy Checklist for New Features

Before adding any feature that collects data:

- [ ] Does it collect PII? If yes, is it absolutely necessary?
- [ ] Is the data encrypted at rest?
- [ ] Is the data encrypted in transit (HTTPS)?
- [ ] Are there clear privacy notices for users?
- [ ] Is the data retention period defined?
- [ ] Can users request data deletion?
- [ ] Are admin access logs in place?
- [ ] Does it comply with GDPR/CCPA if applicable?

## Conclusion

This design document establishes the complete foundation for the ShieldHer platform. The architecture prioritizes privacy, security, accessibility, and maintainability. All contributors must follow the established patterns, naming conventions, and privacy rules to ensure a consistent, safe platform for survivors of digital violence.
