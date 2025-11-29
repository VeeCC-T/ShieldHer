# ShieldHer Platform

> A mobile-first digital literacy and safety platform empowering girls and women to end digital violence.

## 🌐 Live Demo

**Deployed Application:** [Coming Soon - Deploy Link Here]

> Note: The application will be deployed on Render.com (free tier). Initial load may take 30-60 seconds as the service spins up.

## 👥 Team & Collaborators

| Name | Role | GitHub |
|------|------|--------|
| VeeCC-T | Full Stack Developer & Project Lead | [@VeeCC-T](https://github.com/VeeCC-T) |
| [Collaborator Name] | [Role - e.g., Frontend Developer] | [@username] |
| [Collaborator Name] | [Role - e.g., Backend Developer] | [@username] |
| [Collaborator Name] | [Role - e.g., UI/UX Designer] | [@username] |

## 🌟 Mission

ShieldHer provides a safe, anonymous platform for digital literacy education, incident reporting, emergency resources, and support for survivors of digital violence. Built with privacy-first principles and trauma-informed design.

## 🏗️ Architecture

**Frontend:** React 18 + Vite + TailwindCSS  
**Backend:** Django 4.2 + Django REST Framework  
**Database:** PostgreSQL 15+  
**Authentication:** JWT (admin only)  
**Deployment:** Docker + docker-compose

## 📁 Project Structure

```
shieldher/
├── backend/              # Django + DRF backend
│   ├── config/          # Django project settings
│   ├── apps/            # Modular Django apps
│   │   ├── core/        # Base models and utilities
│   │   ├── authentication/  # JWT auth for admins
│   │   ├── lessons/     # Digital literacy lessons
│   │   ├── reports/     # Anonymous incident reports
│   │   ├── resources/   # Emergency resources
│   │   └── donations/   # Anonymous donations
│   └── requirements/    # Python dependencies
├── frontend/            # React frontend
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── layouts/     # Layout components
│       ├── hooks/       # Custom React hooks
│       ├── utils/       # Utilities
│       └── styles/      # Design tokens and global styles
└── docker-compose.yml   # Docker orchestration
```

## 🚀 Quick Start

### Prerequisites

- Docker and docker-compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd shieldher
   ```

2. **Set up environment variables**

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   # Edit .env files with your configuration
   ```

3. **Start all services**

   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**

   ```bash
   docker-compose exec backend python manage.py migrate
   ```

5. **Create admin user**

   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

6. **Access the application**
   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:8000>
   - Admin Panel: <http://localhost:8000/admin>
   - API Health: <http://localhost:8000/api/health/>

### Local Development (Without Docker)

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/development.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## 🧪 Running Tests

### Backend Tests

```bash
# Using Docker
docker-compose exec backend pytest

# Local
cd backend
pytest

# With coverage
pytest --cov=apps --cov-report=html
```

### Frontend Tests

```bash
# Using Docker
docker-compose exec frontend npm test

# Local
cd frontend
npm test

# With coverage
npm run test:coverage
```

## 📚 API Documentation

The API follows RESTful conventions with the following endpoints:

### Public Endpoints (No Authentication Required)

- `GET /api/health/` - Health check
- `GET /api/lessons/` - List digital literacy lessons
- `GET /api/lessons/{id}/` - Get lesson details
- `POST /api/reports/` - Submit anonymous incident report
- `GET /api/resources/` - List emergency resources
- `POST /api/donations/` - Make anonymous donation
- `POST /api/ai/chat/` - AI digital safety assistant

### Admin Endpoints (JWT Authentication Required)

- `POST /api/auth/login/` - Admin login (get JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/admin/reports/` - View submitted reports
- `POST /api/admin/lessons/` - Create/manage lessons
- `POST /api/admin/resources/` - Create/manage resources

Full API documentation available at `/api/schema/` when running the server.

## 🎨 Design System

The platform uses a comprehensive design system with:

- **Color Palette:** Soft, calming, feminine tones with WCAG AA contrast ratios
- **Typography:** Inter (body) and Poppins (headings) optimized for mobile
- **Spacing:** Consistent 4px-based scale
- **Components:** Reusable, accessible UI components

Design tokens are defined in `frontend/src/styles/design-tokens.js`.

## 🔒 Privacy & Security

ShieldHer is built with privacy-first principles:

- ✅ **Anonymous by default:** No user accounts for public users
- ✅ **No PII collection:** Reports contain no personally identifiable information
- ✅ **Field-level encryption:** Sensitive data encrypted at rest
- ✅ **No tracking:** No IP logging, no persistent cookies for anonymous users
- ✅ **PII detection:** Automatic detection and redaction of PII in reports
- ✅ **Rate limiting:** Protection against abuse
- ✅ **Audit logging:** All admin actions logged for accountability

## ♿ Accessibility

All components meet WCAG 2.1 Level AA standards:

- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA attributes
- Minimum 44px touch targets for mobile
- Sufficient color contrast ratios

## 🤝 Contributing

This is a collaborative project. Contributors should:

1. **Follow the established patterns** - Don't modify core files
2. **Respect privacy rules** - Never collect PII without explicit consent
3. **Write tests** - Both unit tests and property-based tests
4. **Document changes** - Update README and API docs
5. **Use the TASK_CHECKLIST.md** - Document your work for handoff

### Adding New Features

See the [Extension Guidelines](./docs/EXTENSION_GUIDELINES.md) for detailed instructions on:

- Adding new Django apps
- Creating new API endpoints
- Building new UI components
- Extending the design system

### Naming Conventions

- **Python:** snake_case for files, functions, variables
- **React:** PascalCase for components, camelCase for functions
- **Django apps:** Lowercase, plural (e.g., `lessons`, `reports`)
- **Database tables:** Lowercase, plural with underscores

## 📋 Task Checklist Template

When completing work, use the `TASK_CHECKLIST.md` template to document:

- Files changed
- Tests added
- Accessibility considerations
- Security/privacy notes
- Commands to run locally

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# View database logs
docker-compose logs db

# Reset database
docker-compose down -v
docker-compose up -d
```

### Frontend Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### Backend Migration Issues

```bash
# Reset migrations (development only!)
docker-compose exec backend python manage.py migrate --fake-initial

# Or start fresh
docker-compose down -v
docker-compose up -d
docker-compose exec backend python manage.py migrate
```

## 🚀 Deployment

### Deploying to Render.com (Recommended - Free Tier)

#### Prerequisites

- GitHub account with this repository
- Render.com account (sign up at <https://render.com>)

#### Step 1: Deploy PostgreSQL Database

1. Go to Render Dashboard → New → PostgreSQL
2. Configure:
   - **Name:** shieldher-db
   - **Database:** shieldher
   - **User:** shieldher_user
   - **Region:** Choose closest to your users
   - **Plan:** Free
3. Click "Create Database"
4. Copy the **Internal Database URL** (starts with `postgresql://`)

#### Step 2: Deploy Backend (Django)

1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Name:** shieldher-backend
   - **Environment:** Docker
   - **Region:** Same as database
   - **Branch:** main
   - **Dockerfile Path:** backend/Dockerfile
   - **Plan:** Free
4. Add Environment Variables:

   ```
   DJANGO_SETTINGS_MODULE=config.settings.production
   SECRET_KEY=<generate-a-secure-random-key>
   DATABASE_URL=<paste-internal-database-url-from-step-1>
   ALLOWED_HOSTS=.onrender.com
   DEBUG=False
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
   ```

5. Click "Create Web Service"
6. After deployment, run migrations:
   - Go to Shell tab
   - Run: `python manage.py migrate`
   - Run: `python manage.py createsuperuser`

#### Step 3: Deploy Frontend (React)

1. Go to Render Dashboard → New → Static Site
2. Connect your GitHub repository
3. Configure:
   - **Name:** shieldher-frontend
   - **Branch:** main
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`
4. Add Environment Variable:

   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. Click "Create Static Site"

#### Step 4: Update CORS Settings

1. Go back to backend service environment variables
2. Update `CORS_ALLOWED_ORIGINS` with your actual frontend URL
3. Redeploy backend service

### Alternative Deployment Options

#### Railway.app

- Supports Docker and PostgreSQL
- $5 free credit monthly
- Automatic deployments from GitHub
- [Railway Deployment Guide](https://docs.railway.app/)

#### Vercel (Frontend) + Railway (Backend)

- Vercel: Best for React apps, unlimited bandwidth
- Railway: Good for Django + PostgreSQL
- Split deployment for better performance

#### Fly.io

- Excellent Docker support
- Free tier: 3 shared-cpu VMs, 3GB storage
- Global edge network
- [Fly.io Django Guide](https://fly.io/docs/django/)

### Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Admin superuser created
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] SSL certificate active (automatic on Render)
- [ ] API endpoints responding
- [ ] Frontend connecting to backend
- [ ] Test anonymous report submission
- [ ] Test lesson viewing
- [ ] Test resource access

## 📞 Support

For questions or issues:

- Check the [API Documentation](http://localhost:8000/api/schema/)
- Review the [Design Document](./.kiro/specs/shieldher-foundation/design.md)
- Contact the team lead

## 📄 License

[Add license information]

## 🙏 Acknowledgments

Built for the ShieldHer hackathon with the mission to end digital violence against women and girls.

---

**Remember:** This platform serves survivors of digital violence. Every line of code should prioritize their safety, privacy, and well-being.
