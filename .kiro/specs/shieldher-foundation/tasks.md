# Implementation Plan

- [x] 1. Initialize project structure and configuration files



  - Create root directory structure with backend/, frontend/, and docker configuration
  - Create .gitignore excluding __pycache__, *.pyc, .env, node_modules, dist/
  - Create .env.example files for both backend and frontend with all required variables
  - Create README.md with project overview
  - _Requirements: 1.1, 9.1_






- [ ] 2. Set up Django backend foundation
  - [ ] 2.1 Initialize Django project with config/ directory
    - Create Django project named 'config' in backend/

    - Set up settings split: base.py, development.py, production.py
    - Configure INSTALLED_APPS with DRF and required packages
    - _Requirements: 1.2, 4.1_

  - [x] 2.2 Configure PostgreSQL database connection

    - Install psycopg2-binary and dj-database-url
    - Configure DATABASE settings to use environment variables
    - Set up connection pooling
    - _Requirements: 4.2_


  - [ ] 2.3 Install and configure Django REST Framework
    - Add DRF to INSTALLED_APPS
    - Configure REST_FRAMEWORK settings (pagination, renderers, parsers)
    - Set up custom exception handler
    - _Requirements: 4.1_


  - [ ] 2.4 Configure CORS middleware
    - Install django-cors-headers
    - Add to INSTALLED_APPS and MIDDLEWARE
    - Configure CORS_ALLOWED_ORIGINS from environment variables

    - _Requirements: 4.3_

  - [-] 2.5 Set up security middleware and headers

    - Configure SecurityMiddleware
    - Set SECURE_* settings for production
    - Configure X-Frame-Options, X-Content-Type-Options
    - _Requirements: 4.5_

  - [ ] 2.6 Create requirements files
    - Create requirements/base.txt with core dependencies
    - Create requirements/development.txt with dev tools
    - Create requirements/production.txt with production packages
    - _Requirements: 1.2_

- [-] 3. Create core app with base models and utilities


  - [ ] 3.1 Create core Django app
    - Run `python manage.py startapp core apps/core`
    - Add to INSTALLED_APPS
    - _Requirements: 1.2_



  - [ ] 3.2 Create TimeStampedModel base class
    - Define abstract model with created_at and updated_at fields
    - Use auto_now_add and auto_now
    - _Requirements: 5.1_

  - [x]* 3.3 Write property test for timestamp fields


    - **Property 7: Model timestamp fields**
    - **Validates: Requirements 5.1**

  - [ ] 3.3 Create encryption utilities
    - Install cryptography package
    - Create encrypt_field() and decrypt_field() functions using Fernet
    - Load encryption key from environment variables
    - _Requirements: 5.2, 8.3_


  - [ ]* 3.4 Write property test for field-level encryption
    - **Property 8: Field-level encryption**
    - **Validates: Requirements 5.2, 8.3**

  - [ ] 3.5 Create custom exception handler
    - Implement custom_exception_handler() that returns safe error messages
    - Configure in REST_FRAMEWORK settings

    - _Requirements: 4.5_

  - [ ]* 3.6 Write property test for safe error messages
    - **Property 6: Safe error messages**
    - **Validates: Requirements 4.5, 8.5**

  - [ ] 3.7 Create custom pagination class
    - Implement StandardResultsSetPagination with page_size=20
    - Configure in REST_FRAMEWORK settings
    - _Requirements: 7.2_

  - [ ]* 3.8 Write property test for paginated response structure
    - **Property 14: Paginated response structure**
    - **Validates: Requirements 7.2**

  - [x] 3.9 Create audit logging model and utilities



    - Create AuditLog model with admin_user, action, content_type, timestamp
    - Create log_admin_action() utility function
    - _Requirements: 6.5_

  - [ ]* 3.10 Write property test for admin action audit logging
    - **Property 13: Admin action audit logging**
    - **Validates: Requirements 6.5**

- [x] 4. Implement authentication system




  - [ ] 4.1 Create authentication Django app
    - Run `python manage.py startapp authentication apps/authentication`
    - Add to INSTALLED_APPS
    - _Requirements: 1.2_



  - [ ] 4.2 Create AdminUser model
    - Extend AbstractUser with role field (admin, moderator)

    - Configure AUTH_USER_MODEL in settings
    - _Requirements: 6.1_

  - [ ] 4.3 Install and configure djangorestframework-simplejwt
    - Install djangorestframework-simplejwt


    - Configure JWT settings (access token 1 hour, refresh 24 hours)
    - Load JWT secret from environment variables
    - _Requirements: 6.1_



  - [ ] 4.4 Create authentication serializers
    - Create LoginSerializer for username/password
    - Create UserSerializer for user details
    - _Requirements: 6.1_

  - [ ] 4.5 Create authentication views
    - Implement login view using TokenObtainPairView


    - Implement refresh view using TokenRefreshView
    - Return generic error messages on auth failure

    - _Requirements: 6.1, 6.4_

  - [ ]* 4.6 Write property test for generic authentication errors
    - **Property 12: Generic authentication errors**
    - **Validates: Requirements 6.4**

  - [ ] 4.7 Create authentication URLs
    - Set up /api/auth/login/ and /api/auth/refresh/ endpoints
    - _Requirements: 6.1_

  - [ ] 4.8 Create IsAdminUser permission class
    - Implement custom permission requiring JWT and admin role
    - _Requirements: 6.2_

  - [ ]* 4.9 Write property test for admin authentication requirement
    - **Property 10: Admin authentication requirement**
    - **Validates: Requirements 6.2**

  - [ ]* 4.10 Write property test for public endpoint anonymous access
    - **Property 11: Public endpoint anonymous access**
    - **Validates: Requirements 6.3**

- [-] 5. Create database models for core features


  - [ ] 5.1 Create lessons Django app
    - Run `python manage.py startapp lessons apps/lessons`
    - Add to INSTALLED_APPS
    - _Requirements: 1.2_



  - [ ] 5.2 Create Lesson model
    - Define fields: title, description, category, duration_minutes, difficulty, content (JSONField), quiz (JSONField), thumbnail_url, published
    - Inherit from TimeStampedModel
    - Add indexes on category, difficulty, published
    - Add help_text to all fields
    - _Requirements: 5.1, 5.3, 5.4, 5.5_

  - [x]* 5.3 Write property test for model field documentation

    - **Property 9: Model field documentation**
    - **Validates: Requirements 5.5**

  - [-] 5.4 Create reports Django app

    - Run `python manage.py startapp reports apps/reports`
    - Add to INSTALLED_APPS
    - _Requirements: 1.2_

  - [x] 5.5 Create Report model with privacy-first design

    - Define fields: confirmation_code, incident_type, description (encrypted), timestamp, location_free_text, evidence_links (JSONField), consent_for_followup, redaction_applied
    - NO fields for name, email, phone, IP, user_id
    - Inherit from TimeStampedModel
    - Add unique index on confirmation_code
    - Implement generate_confirmation_code() method
    - Override save() to encrypt description
    - Add help_text to all fields
    - _Requirements: 5.1, 5.2, 5.4, 5.5_


  - [ ] 5.6 Create resources Django app
    - Run `python manage.py startapp resources apps/resources`
    - Add to INSTALLED_APPS
    - _Requirements: 1.2_



  - [ ] 5.7 Create Resource model
    - Define fields: type, name, description, contact, website, available_24_7, languages (JSONField), country, published
    - Inherit from TimeStampedModel
    - Add indexes on type, country, published
    - Add help_text to all fields

    - _Requirements: 5.1, 5.3, 5.4, 5.5_

  - [ ] 5.8 Create donations Django app
    - Run `python manage.py startapp donations apps/donations`


    - Add to INSTALLED_APPS
    - _Requirements: 1.2_

  - [ ] 5.9 Create Donation model
    - Define fields: confirmation_code, amount, currency, payment_processor_id, status
    - NO donor PII fields
    - Inherit from TimeStampedModel



    - Add unique index on confirmation_code
    - Implement generate_confirmation_code() method
    - Add help_text to all fields
    - _Requirements: 5.1, 5.4, 5.5_

  - [ ] 5.10 Create and run initial migrations
    - Run makemigrations for all apps
    - Run migrate to create database tables
    - _Requirements: 5.1_

- [x] 6. Implement PII detection and redaction system





  - [ ] 6.1 Create PII detection utilities in reports app
    - Define regex patterns for email, phone, SSN, credit card
    - Implement detect_pii() function
    - Implement redact_pii() function
    - Implement process_report_text() function
    - _Requirements: 8.3_

  - [ ]* 6.2 Write property test for PII detection
    - Test that PII patterns are detected and redacted
    - Test that redaction flag is set correctly
    - _Requirements: 8.3_

- [ ] 7. Implement rate limiting middleware
  - [ ] 7.1 Install and configure django-ratelimit
    - Install django-ratelimit package
    - Create rate limiting decorators for different endpoint types
    - Configure general rate limit (100 requests per 15 minutes)
    - Configure strict rate limit for reports (10 requests per hour)
    - _Requirements: 4.4_

  - [ ]* 7.2 Write property test for rate limiting enforcement
    - **Property 5: Rate limiting enforcement**
    - **Validates: Requirements 4.4**

  - [ ] 7.3 Ensure rate limit keys are non-identifying
    - Configure rate limit to use non-identifying keys for public endpoints
    - _Requirements: 8.4_

  - [ ]* 7.4 Write property test for non-identifying rate limit keys
    - **Property 19: Non-identifying rate limit keys**
    - **Validates: Requirements 8.4**

- [ ] 8. Create API endpoints for lessons
  - [ ] 8.1 Create lesson serializers
    - Create LessonListSerializer (summary fields)
    - Create LessonDetailSerializer (full content)
    - Create LessonCreateSerializer (admin only)
    - _Requirements: 7.2_

  - [ ] 8.2 Create lesson viewsets
    - Implement LessonViewSet with list and retrieve actions (public)
    - Filter by category, difficulty, published=True
    - Apply pagination
    - Implement admin create/update/delete actions (admin only)
    - _Requirements: 7.2_

  - [ ] 8.3 Create lesson URLs
    - Set up /api/lessons/ endpoints using DRF router
    - _Requirements: 7.2_

  - [ ] 8.4 Register lesson admin interface
    - Create LessonAdmin class with list_display, list_filter, search_fields
    - _Requirements: 5.5_

- [ ] 9. Create API endpoints for anonymous reporting
  - [ ] 9.1 Create report serializers
    - Create ReportCreateSerializer (public, validates no PII)
    - Create ReportListSerializer (admin only)
    - Implement PII validation in serializer
    - _Requirements: 7.4, 8.3_

  - [ ]* 9.2 Write property test for validation error format
    - **Property 16: Validation error format**
    - **Validates: Requirements 7.4**

  - [ ] 9.3 Create report viewsets
    - Implement ReportViewSet with create action (public, anonymous)
    - Apply PII detection and redaction before saving
    - Return confirmation code on success
    - Implement list action (admin only)
    - Apply strict rate limiting to create action
    - _Requirements: 7.2, 8.3_

  - [ ] 9.4 Create report URLs
    - Set up /api/reports/ endpoints
    - _Requirements: 7.2_

  - [ ] 9.5 Register report admin interface
    - Create ReportAdmin class (read-only for safety)
    - Show redaction_applied status
    - _Requirements: 5.5_

- [ ] 10. Create API endpoints for resources
  - [ ] 10.1 Create resource serializers
    - Create ResourceSerializer
    - Create ResourceCreateSerializer (admin only)
    - _Requirements: 7.2_

  - [ ] 10.2 Create resource viewsets
    - Implement ResourceViewSet with list and retrieve (public)
    - Filter by type, country, published=True
    - Apply pagination
    - Implement admin create/update/delete actions
    - _Requirements: 7.2_

  - [ ] 10.3 Create resource URLs
    - Set up /api/resources/ endpoints
    - _Requirements: 7.2_

  - [ ] 10.4 Register resource admin interface
    - Create ResourceAdmin class
    - _Requirements: 5.5_

- [ ] 11. Create API endpoints for donations
  - [ ] 11.1 Create donation serializers
    - Create DonationCreateSerializer (public, anonymous)
    - NO donor PII fields
    - _Requirements: 7.2_

  - [ ] 11.2 Create donation viewsets
    - Implement DonationViewSet with create action (public, anonymous)
    - Generate confirmation code
    - Return confirmation code on success
    - _Requirements: 7.2_

  - [ ] 11.3 Create donation URLs
    - Set up /api/donations/ endpoints
    - _Requirements: 7.2_

- [ ] 12. Create health check and API schema endpoints
  - [ ] 12.1 Create health check view
    - Implement health_check() view that checks database connection
    - Return JSON with status, timestamp, database, version
    - _Requirements: 7.1_

  - [ ] 12.2 Set up OpenAPI schema endpoint
    - Install drf-spectacular
    - Configure schema generation
    - Set up /api/schema/ endpoint
    - _Requirements: 7.5_

  - [ ]* 12.3 Write property test for error response format
    - **Property 15: Error response format**
    - **Validates: Requirements 7.3**

- [ ] 13. Configure privacy-preserving logging
  - [ ] 13.1 Configure Django logging
    - Set up logging configuration in settings
    - Create custom log filter to exclude IP addresses
    - Ensure no PII in application logs
    - _Requirements: 8.1_

  - [ ]* 13.2 Write property test for no IP logging
    - **Property 17: No IP logging for public users**
    - **Validates: Requirements 8.1**

  - [ ] 13.3 Ensure no identifying cookies for public users
    - Disable session middleware for public endpoints
    - Configure cookie settings
    - _Requirements: 8.2_

  - [ ]* 13.4 Write property test for no identifying cookies
    - **Property 18: No identifying cookies for public users**
    - **Validates: Requirements 8.2**

- [ ] 14. Set up frontend foundation with React + Vite + TailwindCSS
  - [ ] 14.1 Initialize Vite project with React
    - Run `npm create vite@latest frontend -- --template react`
    - Install dependencies
    - Configure Vite for environment variables
    - _Requirements: 1.3_

  - [ ] 14.2 Install and configure TailwindCSS
    - Install tailwindcss, postcss, autoprefixer
    - Run `npx tailwindcss init -p`
    - Configure content paths in tailwind.config.js
    - _Requirements: 1.3_

  - [ ] 14.3 Create frontend folder structure
    - Create src/components/common/ directory
    - Create src/pages/ directory
    - Create src/layouts/ directory
    - Create src/hooks/ directory
    - Create src/utils/ directory
    - Create src/styles/ directory
    - _Requirements: 1.3_

- [ ] 15. Create design system with tokens
  - [ ] 15.1 Create design tokens file
    - Create src/styles/design-tokens.js
    - Define color palette (primary, secondary, neutral, semantic)
    - Define typography scale (fontFamily, fontSize, fontWeight)
    - Define spacing scale
    - Define responsive breakpoints
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 15.2 Write property test for color contrast accessibility
    - **Property 2: Color contrast accessibility**
    - **Validates: Requirements 2.1**

  - [ ] 15.3 Configure Tailwind with design tokens
    - Import design tokens in tailwind.config.js
    - Extend theme with custom colors, fonts, spacing
    - _Requirements: 2.5_

  - [ ] 15.4 Create global CSS file
    - Create src/styles/global.css
    - Import Tailwind directives
    - Add custom CSS for focus states and accessibility
    - _Requirements: 2.5_

- [ ] 16. Build reusable UI component library
  - [ ] 16.1 Create Button component
    - Implement variants (primary, secondary, outline, ghost, danger)
    - Implement sizes (sm, md, lg)
    - Ensure 44px minimum height for touch targets
    - Add proper ARIA attributes
    - Add visible focus states
    - Add keyboard navigation support
    - _Requirements: 3.1, 3.6, 3.7_

  - [ ]* 16.2 Write property test for component ARIA attributes
    - **Property 3: Component ARIA attributes**
    - **Validates: Requirements 3.6**

  - [ ]* 16.3 Write property test for keyboard accessibility
    - **Property 4: Keyboard accessibility**
    - **Validates: Requirements 3.7**

  - [ ] 16.4 Create Input component
    - Implement text, email, password, tel, url types
    - Add floating label animation
    - Add error state with red border and message
    - Add helper text
    - Proper label association with htmlFor
    - Add ARIA attributes (aria-invalid, aria-describedby)
    - _Requirements: 3.2, 3.6, 3.7_

  - [ ] 16.5 Create Textarea component
    - Similar to Input but for multi-line text
    - Add character count (optional)
    - _Requirements: 3.2_

  - [ ] 16.6 Create Select component
    - Implement dropdown with proper accessibility
    - Add error state
    - _Requirements: 3.2_

  - [ ] 16.7 Create Card component
    - Implement padding variants (none, sm, md, lg)
    - Implement shadow variants (none, sm, md, lg)
    - Add hover state
    - Use semantic HTML (article/section)
    - _Requirements: 3.3, 3.6_

  - [ ] 16.8 Create Modal component
    - Implement backdrop with opacity transition
    - Add close button with X icon
    - Implement focus trap
    - Add escape key handler
    - Add click-outside-to-close
    - Add role="dialog" and aria-modal="true"
    - Full-screen on mobile with slide-up animation
    - _Requirements: 3.3, 3.6, 3.7_

  - [ ] 16.9 Create Typography components
    - Create Heading component (h1-h6)
    - Create Text component (body, caption)
    - Ensure proper heading hierarchy
    - _Requirements: 3.4, 3.6_

  - [ ] 16.10 Create Header component
    - Add logo and site title
    - Add navigation links
    - Add mobile hamburger menu
    - Add user menu for admin
    - Add emergency exit button
    - Use nav landmark with aria-label
    - _Requirements: 3.5, 3.6, 3.7_

  - [ ] 16.11 Create Footer component
    - Add resource links
    - Add privacy policy link
    - Add emergency exit button (large, prominent)
    - Use footer landmark
    - Stacked layout on mobile
    - _Requirements: 3.5, 3.6_

- [ ] 17. Create frontend layouts and routing
  - [ ] 17.1 Install React Router
    - Install react-router-dom
    - _Requirements: 1.3_

  - [ ] 17.2 Create MainLayout component
    - Include Header and Footer
    - Add main content area with proper landmarks
    - _Requirements: 1.3_

  - [ ] 17.3 Create AdminLayout component
    - Include admin navigation
    - Require authentication
    - _Requirements: 1.3_

  - [ ] 17.4 Set up routing in App.jsx
    - Configure routes for /, /academy, /report, /resources, /chat, /donate, /admin/*
    - Use MainLayout for public routes
    - Use AdminLayout for admin routes
    - _Requirements: 1.3_

- [ ] 18. Create frontend page components
  - [ ] 18.1 Create Home page
    - Display platform overview
    - Add navigation cards to main features
    - Include clear privacy notice
    - _Requirements: 1.3_

  - [ ] 18.2 Create Academy page placeholder
    - Display message for Person B to implement lessons
    - _Requirements: 1.3_

  - [ ] 18.3 Create Report page
    - Show clear privacy notice before form
    - Create report submission form using Input components
    - Display confirmation code after submission
    - _Requirements: 1.3_

  - [ ] 18.4 Create Resources page placeholder
    - Display message for Person C to implement resources
    - _Requirements: 1.3_

  - [ ] 18.5 Create Chat page placeholder
    - Display message for Person D to implement AI chat
    - _Requirements: 1.3_

  - [ ] 18.6 Create Donate page placeholder
    - Display message for Person E to implement donations
    - _Requirements: 1.3_

- [ ] 19. Create frontend API utilities and hooks
  - [ ] 19.1 Create API client utility
    - Install axios
    - Create src/utils/api.js with configured axios instance
    - Set base URL from environment variables
    - Add request/response interceptors
    - Handle errors consistently
    - _Requirements: 1.3_

  - [ ] 19.2 Create useAuth hook
    - Manage JWT tokens in memory (not localStorage)
    - Provide login, logout, authentication state
    - Handle token refresh
    - _Requirements: 1.3_

  - [ ] 19.3 Create useApi hook
    - Handle loading, error, success states
    - Provide consistent API call interface
    - _Requirements: 1.3_

  - [ ] 19.4 Create useForm hook
    - Handle form state and validation
    - Provide consistent form handling
    - _Requirements: 1.3_

- [ ] 20. Set up Docker configuration
  - [ ] 20.1 Create backend Dockerfile
    - Use Python 3.11 slim image
    - Install dependencies from requirements/production.txt
    - Create non-root user
    - Set up gunicorn command
    - _Requirements: 1.5_

  - [ ] 20.2 Create frontend Dockerfile
    - Multi-stage build: Node for build, nginx for serving
    - Copy built files to nginx
    - Configure nginx for SPA routing
    - _Requirements: 1.5_

  - [ ] 20.3 Create docker-compose.yml
    - Define services: backend, frontend, db (PostgreSQL)
    - Configure environment variables
    - Set up volumes for database persistence
    - Expose ports: frontend (3000), backend (8000), db (5432)
    - Add health checks for all services
    - _Requirements: 1.5_

  - [ ] 20.4 Create nginx configuration for frontend
    - Configure SPA routing (fallback to index.html)
    - Set up gzip compression
    - Configure security headers
    - _Requirements: 1.5_

- [ ] 21. Set up testing infrastructure
  - [ ] 21.1 Configure pytest for backend
    - Install pytest, pytest-django, pytest-cov
    - Create pytest.ini configuration
    - Configure test database
    - _Requirements: 10.1_

  - [ ] 21.2 Install Hypothesis for property-based testing
    - Install hypothesis
    - Create example property test
    - _Requirements: 10.1, 10.3_

  - [ ] 21.3 Install factory_boy for test data
    - Install factory_boy
    - Create factories for models
    - _Requirements: 10.1_

  - [ ] 21.4 Configure Vitest for frontend
    - Install vitest, @testing-library/react, @testing-library/jest-dom
    - Create vitest.config.js
    - _Requirements: 10.2_

  - [ ] 21.5 Install fast-check for frontend property testing
    - Install fast-check
    - Create example property test
    - _Requirements: 10.2, 10.3_

  - [ ] 21.6 Configure coverage reporting
    - Configure pytest-cov for backend
    - Configure vitest coverage for frontend
    - _Requirements: 10.4_

- [ ] 22. Create comprehensive documentation
  - [ ] 22.1 Write README.md with setup instructions
    - Add project overview and mission
    - Document tech stack
    - Provide Docker setup instructions (docker-compose up)
    - Document environment variables
    - Add local development instructions
    - _Requirements: 9.1, 9.2_

  - [ ] 22.2 Document folder structure and naming conventions
    - Explain Django apps/ structure
    - Explain frontend component organization
    - Document naming conventions (PascalCase for components, snake_case for Python)
    - _Requirements: 9.2_

  - [ ] 22.3 Document design system
    - Explain design tokens and how to use them
    - Provide component usage examples with code snippets
    - Document accessibility requirements
    - _Requirements: 9.3_

  - [ ] 22.4 Document API endpoints
    - List all endpoints with methods, paths, request/response examples
    - Document authentication requirements
    - Document rate limits
    - _Requirements: 9.2_

  - [ ] 22.5 Document privacy and security rules
    - List all privacy requirements for contributors
    - Provide PII checklist for new features
    - Document security best practices
    - _Requirements: 9.2_

  - [ ] 22.6 Create extension guidelines
    - Document how to add new Django apps
    - Document how to add new API endpoints
    - Document how to add new frontend components
    - Provide code examples
    - _Requirements: 9.4_

  - [ ] 22.7 Create TASK_CHECKLIST.md template
    - Provide template for Person B-F to document their work
    - Include sections for files changed, tests, accessibility, security
    - _Requirements: 9.5_

- [ ]* 23. Write property test for no hardcoded secrets
  - **Property 1: No hardcoded secrets in configuration**
  - **Validates: Requirements 1.4, 4.6**

- [ ] 24. Final checkpoint - Ensure all tests pass and system is operational
  - Run all backend tests with pytest
  - Run all frontend tests with vitest
  - Generate coverage reports
  - Start Docker containers with docker-compose up
  - Verify health check endpoint returns 200 OK
  - Test API endpoints with curl or Postman
  - Verify frontend loads and displays correctly
  - Check that all documentation is complete
  - Ensure all tests pass, ask the user if questions arise
