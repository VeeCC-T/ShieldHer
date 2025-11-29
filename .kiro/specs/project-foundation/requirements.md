# Requirements Document

## Introduction

ShieldHer is a mobile-first digital literacy and safety platform designed to empower girls and women by providing educational resources, anonymous reporting capabilities for digital violence, emergency resources, and AI-powered safety assistance. This requirements document defines the foundational infrastructure that all team members (Persons B-F) will build upon. The foundation must establish a secure, scalable, privacy-first architecture with clear conventions, reusable components, and comprehensive documentation.

## Glossary

- **ShieldHer Platform**: The complete web application system including frontend and backend
- **Anonymous User**: A public user accessing the platform without creating an account or providing PII
- **Admin User**: An authenticated user with JWT token who can manage content and view reports
- **PII**: Personally Identifiable Information (names, emails, phone numbers, addresses)
- **Design Token**: A named variable representing a design decision (color, spacing, typography)
- **UI Kit**: A collection of reusable React components following consistent design patterns
- **API Contract**: A documented specification of endpoint paths, methods, request/response shapes
- **Trauma-Informed UX**: User experience design that prioritizes safety, control, and emotional well-being
- **Rate Limiting**: A security mechanism that restricts the number of requests from a client
- **JWT**: JSON Web Token used for stateless authentication
- **Express Application**: The Node.js backend server handling API requests
- **PostgreSQL Database**: The relational database storing application data
- **Vite**: The build tool and development server for the React frontend
- **TailwindCSS**: The utility-first CSS framework for styling
- **Middleware**: Express functions that process requests before reaching route handlers

## Requirements

### Requirement 1

**User Story:** As a developer joining the ShieldHer team, I want a complete project structure with clear folder organization, so that I know exactly where to add new features without breaking existing work.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL provide a frontend directory containing subdirectories for components, layouts, pages, hooks, and utils
2. THE ShieldHer Platform SHALL provide a backend directory containing subdirectories for routes, controllers, models, middleware, config, and utils
3. THE ShieldHer Platform SHALL include a root-level configuration for Docker, environment variables, and package management
4. THE ShieldHer Platform SHALL document the folder structure and naming conventions in a README file
5. THE ShieldHer Platform SHALL enforce consistent file naming using kebab-case for files and PascalCase for React components

### Requirement 2

**User Story:** As a frontend developer, I want a comprehensive design system with tokens and reusable components, so that I can build consistent, accessible, mobile-first interfaces quickly.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL define a color palette with primary, secondary, accent, neutral, success, warning, error, and background colors as design tokens
2. THE ShieldHer Platform SHALL define a typography scale with font families, sizes, weights, and line heights as design tokens
3. THE ShieldHer Platform SHALL define a spacing scale with consistent values for margins, padding, and gaps as design tokens
4. THE ShieldHer Platform SHALL provide reusable UI components including Button, Card, Modal, Input, Navbar, and Footer
5. WHEN rendering any UI component THEN the ShieldHer Platform SHALL apply mobile-first responsive design with touch-friendly targets
6. WHEN rendering any UI component THEN the ShieldHer Platform SHALL include proper ARIA attributes and semantic HTML for accessibility
7. THE ShieldHer Platform SHALL use TailwindCSS utility classes configured with the design token values

### Requirement 3

**User Story:** As a backend developer, I want a fully configured Express application with database connection and authentication middleware, so that I can build secure API endpoints without reinventing infrastructure.

#### Acceptance Criteria

1. THE Express Application SHALL initialize with middleware for JSON parsing, CORS, rate limiting, and error handling
2. THE Express Application SHALL establish a connection to the PostgreSQL Database using environment variables for credentials
3. THE Express Application SHALL provide JWT authentication middleware that validates tokens and attaches admin user context
4. THE Express Application SHALL provide a centralized error handling middleware that returns safe, generic error messages to clients
5. THE Express Application SHALL load configuration values from environment variables without hardcoding secrets
6. WHEN the Express Application starts THEN it SHALL log the startup status and listening port

### Requirement 4

**User Story:** As a security-conscious developer, I want authentication and authorization mechanisms in place, so that admin-only endpoints are protected and anonymous users remain truly anonymous.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL provide JWT-based authentication for admin users only
2. THE ShieldHer Platform SHALL NOT require authentication, accounts, or PII for Anonymous Users accessing public endpoints
3. WHEN an admin user authenticates THEN the Express Application SHALL generate a JWT token with user ID and role claims
4. WHEN a request includes a valid JWT token THEN the Express Application SHALL allow access to admin-protected routes
5. WHEN a request to an admin-protected route lacks a valid JWT token THEN the Express Application SHALL return a 401 Unauthorized response
6. THE Express Application SHALL NOT log IP addresses, device fingerprints, or any identifying information for Anonymous Users

### Requirement 5

**User Story:** As an API consumer, I want clearly documented API contracts with defined endpoints, request formats, and response shapes, so that I can integrate with the backend predictably.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL document all API endpoints with paths, HTTP methods, request bodies, and response formats
2. THE ShieldHer Platform SHALL provide a health check endpoint at /api/health that returns status information
3. THE ShieldHer Platform SHALL provide authentication endpoints at /api/auth for admin login
4. THE ShieldHer Platform SHALL provide lesson endpoints at /api/lessons for digital literacy content
5. THE ShieldHer Platform SHALL provide report endpoints at /api/reports for anonymous incident reporting
6. THE ShieldHer Platform SHALL provide resource endpoints at /api/resources for emergency resources and hotlines
7. THE ShieldHer Platform SHALL provide donation endpoints at /api/donations for anonymous contributions
8. THE ShieldHer Platform SHALL provide AI chat endpoints at /api/ai/chat for digital safety assistance
9. WHEN documenting API contracts THEN the ShieldHer Platform SHALL specify required fields, optional fields, and validation rules

### Requirement 6

**User Story:** As a privacy advocate, I want the anonymous reporting system to be designed with zero PII collection from the start, so that survivors can report incidents safely without fear of identification.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL define a Report model that stores only incident_type, description, timestamp, location_free_text, evidence_links, and consent_for_followup
2. THE ShieldHer Platform SHALL NOT include fields for names, emails, phone numbers, or other PII in the Report model
3. WHEN an Anonymous User submits a report THEN the Express Application SHALL validate that no PII patterns exist in free-text fields
4. WHEN PII patterns are detected in report text THEN the Express Application SHALL redact the content and log a redaction event
5. THE ShieldHer Platform SHALL generate a non-identifying confirmation code for each report that users can save locally
6. THE ShieldHer Platform SHALL NOT store lookup keys or session identifiers that could link reports to specific users

### Requirement 7

**User Story:** As a platform administrator, I want rate limiting and security middleware in place, so that the platform is protected from abuse and denial-of-service attacks.

#### Acceptance Criteria

1. THE Express Application SHALL apply rate limiting to all public endpoints with a maximum of 100 requests per 15 minutes per IP
2. THE Express Application SHALL apply stricter rate limiting to report submission endpoints with a maximum of 10 requests per hour per IP
3. WHEN rate limits are exceeded THEN the Express Application SHALL return a 429 Too Many Requests response with a generic message
4. THE Express Application SHALL include helmet middleware for security headers
5. THE Express Application SHALL validate and sanitize all user inputs before processing

### Requirement 8

**User Story:** As a team member joining the project, I want comprehensive documentation with setup instructions, conventions, and extension guidelines, so that I can contribute effectively without breaking existing work.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL provide a README file with project overview, tech stack, and setup instructions
2. THE ShieldHer Platform SHALL document all naming conventions for files, components, routes, and database tables
3. THE ShieldHer Platform SHALL document the design system including how to use tokens and components
4. THE ShieldHer Platform SHALL document all API endpoints with example requests and responses
5. THE ShieldHer Platform SHALL provide instructions for running the application locally with Docker
6. THE ShieldHer Platform SHALL document privacy and security rules that all contributors must follow
7. THE ShieldHer Platform SHALL provide guidelines for extending the platform without modifying core files

### Requirement 9

**User Story:** As a developer, I want the database schema defined with proper models and migrations, so that I can persist data reliably and extend the schema safely.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL define database models for Admin, Lesson, Report, Resource, and Donation entities
2. THE ShieldHer Platform SHALL use Sequelize or Prisma ORM for database interactions and migrations
3. WHEN sensitive data is stored THEN the ShieldHer Platform SHALL encrypt fields at rest using encryption helpers
4. THE ShieldHer Platform SHALL include created_at and updated_at timestamps on all models for auditability
5. THE ShieldHer Platform SHALL define foreign key relationships and constraints where appropriate

### Requirement 10

**User Story:** As a developer, I want Docker configuration for consistent development and deployment environments, so that the application runs reliably across different machines.

#### Acceptance Criteria

1. THE ShieldHer Platform SHALL provide a docker-compose.yml file that orchestrates frontend, backend, and database services
2. THE ShieldHer Platform SHALL provide Dockerfiles for both frontend and backend with optimized build stages
3. WHEN running docker-compose up THEN the ShieldHer Platform SHALL start all services and establish database connections
4. THE ShieldHer Platform SHALL use environment variables for configuration in Docker containers
5. THE ShieldHer Platform SHALL expose appropriate ports for frontend (3000), backend (8000), and database (5432)
