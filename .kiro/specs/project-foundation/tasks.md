# Implementation Plan

- [ ] 1. Initialize project structure and configuration
  - Create root directory structure with frontend/, backend/, and configuration files
  - Initialize package.json for both frontend and backend with required dependencies
  - Create .gitignore file excluding node_modules, .env, and build artifacts
  - Create .env.example files for both frontend and backend with all required variables
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Set up frontend foundation with React + Vite + TailwindCSS
  - Initialize Vite project with React template in frontend directory
  - Install and configure TailwindCSS with PostCSS
  - Create frontend folder structure (components, layouts, pages, hooks, utils, styles)
  - Configure Vite for environment variables and build optimization
  - _Requirements: 1.1, 1.5_

- [ ] 3. Create design system with tokens and configuration
  - Create design-tokens.js with color palette (primary, secondary, neutral, success, warning, error)
  - Define typography scale (font families, sizes, weights, line heights)
  - Define spacing scale (consistent margin, padding, gap values)
  - Configure tailwind.config.js to use design tokens
  - _Requirements: 2.1, 2.2, 2.3, 2.7_

- [ ] 4. Build reusable UI component library
  - [ ] 4.1 Create Button component with variants (primary, secondary, outline, ghost, danger) and sizes
    - Implement mobile-first responsive design with 44px minimum touch targets
    - Add proper ARIA attributes and keyboard navigation support
    - _Requirements: 2.4, 2.5, 2.6_

  - [ ] 4.2 Write property test for Button accessibility
    - **Property 2: Touch target accessibility**
    - **Property 3: ARIA attribute presence**
    - **Validates: Requirements 2.5, 2.6**

  - [ ] 4.3 Create Input component with label, error states, and validation feedback
    - Implement floating labels and proper label association
    - Add ARIA attributes for accessibility (aria-invalid, aria-describedby)
    - _Requirements: 2.4, 2.6_

  - [ ] 4.4 Create Card component with padding, shadow, and hover variants
    - Use semantic HTML (article/section tags)
    - Ensure proper heading hierarchy
    - _Requirements: 2.4, 2.6_

  - [ ] 4.5 Create Modal component with backdrop, focus trap, and keyboard handling
    - Implement role="dialog", aria-modal, and focus management
    - Add escape key handler and click-outside-to-close
    - Make full-screen on mobile with slide-up animation
    - _Requirements: 2.4, 2.6_

  - [ ] 4.6 Create Navbar component with responsive menu and mobile hamburger
    - Add nav landmark and aria-current for active page
    - Implement collapsible menu for mobile
    - _Requirements: 2.4, 2.6_

  - [ ] 4.7 Create Footer component with resource links and emergency exit button
    - Use footer landmark and clear link text
    - Implement stacked layout for mobile
    - _Requirements: 2.4, 2.6_

- [ ] 5. Set up backend foundation with Express + PostgreSQL
  - Initialize Node.js project in backend directory
  - Install Express, Sequelize, PostgreSQL driver, and security packages
  - Create backend folder structure (routes, controllers, models, middleware, config, utils)
  - Create server.js with Express app initialization
  - _Requirements: 1.2, 3.1_

- [ ] 6. Configure database connection and ORM
  - Create database.js config file with PostgreSQL connection using environment variables
  - Set up Sequelize with connection pooling (max 20 connections)
  - Create database initialization script
  - Add health check for database connection
  - _Requirements: 3.2, 9.2_

- [ ] 7. Implement core middleware stack
  - [ ] 7.1 Add JSON parsing, CORS, and Helmet security middleware
    - Configure CORS with trusted origins from environment variables
    - Set up Helmet with CSP, X-Frame-Options, and other security headers
    - _Requirements: 3.1, 7.4_

  - [ ] 7.2 Create rate limiting middleware
    - Implement general rate limiter (100 requests per 15 minutes)
    - Implement strict rate limiter for reports (10 requests per hour)
    - Return 429 status with generic message when exceeded
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 7.3 Write property test for rate limiting
    - **Property 14: Rate limiting enforcement**
    - **Property 15: Rate limit response format**
    - **Validates: Requirements 7.1, 7.3**

  - [ ] 7.4 Create centralized error handling middleware
    - Define AppError base class and specific error types
    - Implement error handler that returns safe, generic messages
    - Ensure no stack traces or internal details in responses
    - _Requirements: 3.4_

  - [ ] 7.5 Write property test for safe error messages
    - **Property 5: Safe error messages**
    - **Validates: Requirements 3.4**

  - [ ] 7.6 Create input validation and sanitization middleware
    - Use validator.js for input validation
    - Sanitize all user inputs before processing
    - _Requirements: 7.5_

  - [ ] 7.7 Write property test for input sanitization
    - **Property 16: Input sanitization**
    - **Validates: Requirements 7.5**

- [ ] 8. Implement authentication and authorization system
  - [ ] 8.1 Create JWT configuration with secret and expiration from environment
    - Set up jsonwebtoken with HS256 algorithm
    - Configure 24-hour token expiration
    - _Requirements: 4.1_

  - [ ] 8.2 Create authentication middleware for JWT validation
    - Validate JWT tokens and attach admin user context to requests
    - Return 401 for invalid or expired tokens
    - _Requirements: 3.3, 4.4, 4.5_

  - [ ] 8.3 Write property test for JWT validation
    - **Property 4: JWT token validation**
    - **Property 9: Admin route authorization**
    - **Validates: Requirements 3.3, 4.4, 4.5**

  - [ ] 8.4 Create Admin model with username, password_hash, and role
    - Use bcrypt for password hashing (cost factor 12)
    - Include created_at and updated_at timestamps
    - _Requirements: 9.1, 9.4_

  - [ ] 8.5 Create auth controller with login endpoint
    - Implement POST /api/auth/login
    - Generate JWT with user ID and role claims on successful authentication
    - _Requirements: 4.3, 5.3_

  - [ ] 8.6 Write property test for JWT token structure
    - **Property 8: JWT token structure**
    - **Validates: Requirements 4.3**

- [ ] 9. Create database models with encryption and timestamps
  - [ ] 9.1 Create Lesson model
    - Define fields: title, description, category, duration_minutes, difficulty, content (JSONB), quiz (JSONB), published
    - Add created_at and updated_at timestamps
    - _Requirements: 9.1, 9.4_

  - [ ] 9.2 Create Report model with privacy-first design
    - Define fields: confirmation_code, incident_type, description (encrypted), timestamp, location_free_text, evidence_links (array), consent_for_followup, redaction_applied
    - NO fields for name, email, phone, or user identifiers
    - Add created_at and updated_at timestamps
    - Create unique index on confirmation_code
    - _Requirements: 6.1, 6.2, 6.6, 9.1, 9.4_

  - [ ] 9.3 Create Resource model
    - Define fields: type, name, description, contact, website, available_24_7, languages (array), country, published
    - Add created_at and updated_at timestamps
    - _Requirements: 9.1, 9.4_

  - [ ] 9.4 Create Donation model
    - Define fields: confirmation_code, amount, currency, payment_processor_id, status
    - NO donor PII fields
    - Add created_at and updated_at timestamps
    - Create unique index on confirmation_code
    - _Requirements: 9.1, 9.4_

  - [ ] 9.5 Create encryption utility for sensitive fields
    - Implement AES-256-GCM encryption helpers
    - Use encryption key from environment variables
    - Add encrypt() and decrypt() functions
    - _Requirements: 9.3_

  - [ ] 9.6 Write property test for field-level encryption
    - **Property 17: Field-level encryption**
    - **Validates: Requirements 9.3**

  - [ ] 9.7 Write property test for timestamp auditability
    - **Property 18: Timestamp auditability**
    - **Validates: Requirements 9.4**

- [ ] 10. Implement PII detection and redaction system
  - [ ] 10.1 Create PII detection utility
    - Define regex patterns for email, phone, SSN, credit card
    - Implement detectPII() function that scans text for patterns
    - Implement redactPII() function that replaces PII with [REDACTED]
    - _Requirements: 6.3, 6.4_

  - [ ] 10.2 Write property test for PII detection
    - **Property 11: PII detection in reports**
    - **Property 12: PII redaction logging**
    - **Validates: Requirements 6.3, 6.4**

  - [ ] 10.3 Create audit logging utility
    - Implement logger that records admin actions (user ID, action, resource, timestamp)
    - Ensure NO logging of IP addresses or identifying info for anonymous users
    - _Requirements: 4.6_

  - [ ] 10.4 Write property test for anonymous user privacy
    - **Property 10: Anonymous user privacy**
    - **Validates: Requirements 4.6**

- [ ] 11. Build API endpoints for lessons
  - [ ] 11.1 Create lessons controller with list and detail methods
    - Implement GET /api/lessons (public, returns published lessons)
    - Implement GET /api/lessons/:id (public, returns lesson details)
    - Implement POST /api/admin/lessons (admin only, creates lesson)
    - _Requirements: 5.4_

  - [ ] 11.2 Create lessons routes and register in main router
    - Set up routes with appropriate middleware
    - Apply rate limiting to public endpoints
    - _Requirements: 5.4_

  - [ ] 11.3 Write property test for public endpoint accessibility
    - **Property 7: Public endpoint accessibility**
    - **Validates: Requirements 4.2**

- [ ] 12. Build API endpoints for anonymous reporting
  - [ ] 12.1 Create reports controller with create and list methods
    - Implement POST /api/reports (public, anonymous submission)
    - Validate no PII in request, apply redaction if detected
    - Generate unique confirmation code
    - Encrypt description field before storage
    - Implement GET /api/admin/reports (admin only, list all reports)
    - _Requirements: 5.5, 6.1, 6.3, 6.4, 6.5_

  - [ ] 12.2 Create reports routes with strict rate limiting
    - Apply 10 requests per hour rate limit to POST /api/reports
    - Require authentication for admin endpoints
    - _Requirements: 5.5, 7.2_

  - [ ] 12.3 Write property test for unique confirmation codes
    - **Property 13: Unique confirmation codes**
    - **Validates: Requirements 6.5**

- [ ] 13. Build API endpoints for resources
  - [ ] 13.1 Create resources controller with list and detail methods
    - Implement GET /api/resources (public, returns published resources)
    - Implement GET /api/resources/:id (public, returns resource details)
    - Implement POST /api/admin/resources (admin only, creates resource)
    - _Requirements: 5.6_

  - [ ] 13.2 Create resources routes and register in main router
    - Set up routes with appropriate middleware
    - Apply rate limiting to public endpoints
    - _Requirements: 5.6_

- [ ] 14. Build API endpoints for donations
  - [ ] 14.1 Create donations controller with create method
    - Implement POST /api/donations (public, anonymous donation)
    - Generate unique confirmation code
    - NO donor PII collection
    - _Requirements: 5.7_

  - [ ] 14.2 Create donations routes and register in main router
    - Set up routes with appropriate middleware
    - Apply rate limiting to public endpoints
    - _Requirements: 5.7_

- [ ] 15. Build API endpoints for AI chat
  - [ ] 15.1 Create AI chat controller with structured guidance
    - Implement POST /api/ai/chat (public, anonymous)
    - Return structured guidance with follow-up options
    - Include resource links in responses
    - NO requests for identifying information
    - _Requirements: 5.8_

  - [ ] 15.2 Create AI chat routes and register in main router
    - Set up routes with appropriate middleware
    - Apply rate limiting to public endpoints
    - _Requirements: 5.8_

- [ ] 16. Create health check endpoint
  - Implement GET /api/health
  - Return status, timestamp, and database connection status
  - _Requirements: 5.2_

- [ ] 17. Set up frontend routing and layouts
  - [ ] 17.1 Configure React Router with routes for all pages
    - Set up routes: /, /academy, /report, /resources, /chat, /donate, /admin/*
    - _Requirements: 1.1_

  - [ ] 17.2 Create MainLayout component
    - Include Navbar and Footer
    - Add emergency exit button in Footer
    - _Requirements: 1.1_

  - [ ] 17.3 Create AdminLayout component
    - Include admin navigation
    - Require authentication
    - _Requirements: 1.1_

- [ ] 18. Create frontend page components
  - [ ] 18.1 Create Home page with platform overview and navigation
    - Use Card components for feature highlights
    - Include clear privacy notice
    - _Requirements: 1.1_

  - [ ] 18.2 Create Academy page placeholder
    - Display message for Person B to implement lessons
    - _Requirements: 1.1_

  - [ ] 18.3 Create Report page with privacy notice and form
    - Show clear privacy notice before form
    - Use Input components for form fields
    - Display confirmation code after submission
    - _Requirements: 1.1_

  - [ ] 18.4 Create Resources page placeholder
    - Display message for Person C to implement resources
    - _Requirements: 1.1_

  - [ ] 18.5 Create Chat page placeholder
    - Display message for Person D to implement AI chat
    - _Requirements: 1.1_

  - [ ] 18.6 Create Donate page placeholder
    - Display message for Person E to implement donations
    - _Requirements: 1.1_

- [ ] 19. Create frontend API utilities and hooks
  - [ ] 19.1 Create API client utility with Axios
    - Configure base URL from environment variables
    - Add request/response interceptors
    - Handle errors consistently
    - _Requirements: 1.1_

  - [ ] 19.2 Create useAuth hook for admin authentication
    - Manage JWT token in memory (not localStorage for security)
    - Provide login, logout, and authentication state
    - _Requirements: 1.1_

  - [ ] 19.3 Create useApi hook for data fetching
    - Handle loading, error, and success states
    - Provide consistent API call interface
    - _Requirements: 1.1_

- [ ] 20. Set up Docker configuration
  - [ ] 20.1 Create frontend Dockerfile with multi-stage build
    - Build stage: Install dependencies and build with Vite
    - Production stage: Serve with nginx
    - _Requirements: 10.2_

  - [ ] 20.2 Create backend Dockerfile with multi-stage build
    - Build stage: Install dependencies
    - Production stage: Run with Node.js as non-root user
    - _Requirements: 10.2_

  - [ ] 20.3 Create docker-compose.yml orchestrating all services
    - Define frontend, backend, and PostgreSQL services
    - Configure environment variables
    - Expose ports: frontend (3000), backend (8000), database (5432)
    - Add health checks for all services
    - _Requirements: 10.1, 10.3, 10.4, 10.5_

- [ ] 21. Create comprehensive documentation
  - [ ] 21.1 Create README.md with project overview and setup instructions
    - Document tech stack and architecture
    - Provide Docker setup instructions
    - Document environment variables
    - _Requirements: 8.1, 8.5_

  - [ ] 21.2 Document naming conventions and folder structure
    - Explain kebab-case for files, PascalCase for components
    - Document folder structure for both frontend and backend
    - _Requirements: 1.4, 8.2_

  - [ ] 21.3 Document design system usage
    - Explain design tokens and how to use them
    - Provide component usage examples
    - _Requirements: 8.3_

  - [ ] 21.4 Create API documentation with endpoints and examples
    - Document all endpoints with request/response examples
    - Specify required fields, optional fields, and validation rules
    - _Requirements: 5.1, 5.9, 8.4_

  - [ ] 21.5 Document privacy and security rules
    - List all privacy requirements for contributors
    - Provide PII checklist for new features
    - Document security best practices
    - _Requirements: 8.6_

  - [ ] 21.6 Create extension guidelines for contributors
    - Explain how to add new features without breaking existing work
    - Provide code examples for adding endpoints and components
    - _Requirements: 8.7_

  - [ ] 21.7 Create TASK_CHECKLIST.md template
    - Provide template for Person B-F to document their work
    - Include sections for files changed, tests, accessibility, security
    - _Requirements: 8.1_

- [ ] 22. Write property test for file naming consistency
  - **Property 1: File naming consistency**
  - **Validates: Requirements 1.5**

- [ ] 23. Write property test for no hardcoded secrets
  - **Property 6: No hardcoded secrets**
  - **Validates: Requirements 3.5**

- [ ] 24. Final checkpoint - Ensure all tests pass and system is operational
  - Run all unit tests and property tests
  - Start Docker containers with docker-compose up
  - Verify health check endpoint returns 200 OK
  - Test API endpoints with curl or Postman
  - Verify frontend loads and displays correctly
  - Check that all documentation is complete
  - Ensure all tests pass, ask the user if questions arise
