# Local Development Setup Guide

This guide will help you run ShieldHer locally for testing and development.

## Prerequisites

- Docker Desktop installed and running
- Git (for cloning the repository)
- A code editor (VS Code recommended)

## Quick Start (Docker Compose - Recommended)

### 1. Verify Docker is Running

```powershell
docker --version
docker compose version
```

You should see version information for both commands.

### 2. Clone and Navigate to Project (if not already done)

```powershell
cd d:\Projects\EOy\PLP\ShieldHer
```

### 3. Start All Services

```powershell
# Build and start all containers
docker compose up --build
```

**What this does:**

- Starts PostgreSQL database on port 5432
- Starts Django backend on port 8000
- Starts React frontend on port 5173

**First time startup takes 3-5 minutes** as Docker downloads images and builds containers.

### 4. Watch the Logs

You'll see output like:

```
shieldher_db       | database system is ready to accept connections
shieldher_backend  | Watching for file changes with StatReloader
shieldher_frontend | VITE v5.x.x ready in xxx ms
shieldher_frontend | ➜  Local:   http://localhost:5173/
```

When you see these messages, the application is ready!

### 5. Open a New Terminal and Run Migrations

While keeping the first terminal running, open a new PowerShell terminal:

```powershell
cd d:\Projects\EOy\PLP\ShieldHer

# Run database migrations
docker compose exec backend python manage.py migrate

# Create a superuser for admin access
docker compose exec backend python manage.py createsuperuser
```

Follow the prompts to create your admin account:

- Username: (your choice, e.g., `admin`)
- Email: (optional, press Enter to skip)
- Password: (must be at least 8 characters)

### 6. Access the Application

Open your browser and visit:

- **Frontend**: <http://localhost:5173>
- **Backend API**: <http://localhost:8000/api/health/>
- **Admin Panel**: <http://localhost:8000/admin>

Login to admin panel with the credentials you just created.

## Verify Everything Works

### Test the Frontend

1. Go to <http://localhost:5173>
2. Navigate to different pages:
   - Home page should load
   - Click "Lessons" to view educational content
   - Click "Resources" to view support resources
   - Try the emergency helplines
   - Test the AI chatbot

### Test the Backend API

Open a new terminal and run:

```powershell
# Health check
curl http://localhost:8000/api/health/

# Get lessons
curl http://localhost:8000/api/lessons/

# Get resources
curl http://localhost:8000/api/resources/

# Get helplines
curl http://localhost:8000/api/helplines/
```

All should return JSON responses.

### Test the Admin Panel

1. Go to <http://localhost:8000/admin>
2. Login with your superuser credentials
3. You should see sections for:
   - Admin Users
   - Lessons
   - Reports
   - Resources
   - Helplines
   - Donations

## Adding Sample Data

To test the application with real data, you can add sample content through the admin panel:

1. Go to <http://localhost:8000/admin>
2. Add a few lessons under "Lessons"
3. Add resources under "Resources"
4. Add helplines under "Helplines"

Then refresh the frontend to see your content.

## Stopping the Application

In the terminal where docker compose is running:

```powershell
# Press Ctrl+C to stop

# Or in a new terminal:
docker compose down
```

## Restarting the Application

Next time you want to run the app:

```powershell
# Just start (no rebuild needed unless you changed code)
docker compose up

# Or run in background (detached mode)
docker compose up -d

# View logs
docker compose logs -f
```

## Troubleshooting

### Port Already in Use

If you see an error like "port 5173 is already allocated":

```powershell
# Find what's using the port
netstat -ano | findstr :5173

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F

# Or change the port in docker-compose.yml
```

### Database Connection Errors

```powershell
# Restart just the database
docker compose restart db

# Or reset everything
docker compose down -v
docker compose up --build
```

### Backend Won't Start

```powershell
# Check backend logs
docker compose logs backend

# Rebuild backend
docker compose up --build backend
```

### Frontend Shows CORS Errors

Verify that `VITE_API_URL` in `frontend/.env.example` is set to:

```
VITE_API_URL=http://localhost:8000
```

And `CORS_ALLOWED_ORIGINS` in `backend/.env.example` includes:

```
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Changes Not Reflecting

```powershell
# Rebuild containers
docker compose up --build

# Or clear everything and start fresh
docker compose down -v
docker compose up --build
```

## Development Workflow

### Making Code Changes

**Frontend (React):**

- Edit files in `frontend/src/`
- Vite hot-reload will automatically refresh the browser
- No restart needed

**Backend (Django):**

- Edit files in `backend/apps/`
- Django auto-reload will restart the server
- No manual restart needed (usually)

### Adding New Dependencies

**Frontend:**

```powershell
# Enter the frontend container
docker compose exec frontend sh

# Inside container
npm install <package-name>

# Exit
exit

# Rebuild
docker compose up --build frontend
```

**Backend:**

```powershell
# Add to requirements/base.txt or requirements/development.txt
# Then rebuild
docker compose up --build backend
```

### Running Tests

```powershell
# Backend tests (when you add them)
docker compose exec backend python manage.py test

# Frontend tests
docker compose exec frontend npm test
```

### Accessing Database

```powershell
# PostgreSQL shell
docker compose exec db psql -U shieldher_user -d shieldher

# Inside psql:
\dt              # List tables
\d reports       # Describe reports table
SELECT * FROM reports;  # Query data
\q               # Quit
```

### Viewing Logs

```powershell
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db

# Last 100 lines
docker compose logs --tail=100 backend
```

## Manual Setup (Without Docker)

If you prefer not to use Docker:

### Backend Setup

1. **Install Python 3.11+**

2. **Create virtual environment:**

   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```powershell
   pip install -r requirements\development.txt
   ```

4. **Setup PostgreSQL:**
   - Install PostgreSQL 15
   - Create database: `shieldher`
   - Create user: `shieldher_user` with password `shieldher_password`

5. **Run migrations:**

   ```powershell
   python manage.py migrate
   python manage.py createsuperuser
   ```

6. **Start server:**

   ```powershell
   python manage.py runserver
   ```

### Frontend Setup

1. **Install Node.js 18+**

2. **Install dependencies:**

   ```powershell
   cd frontend
   npm install
   ```

3. **Start dev server:**

   ```powershell
   npm run dev
   ```

4. **Access at:** <http://localhost:5173>

## Next Steps

Once everything is running locally:

1. ✅ Test all major features
2. ✅ Add sample data through admin
3. ✅ Test anonymous report submission
4. ✅ Test chatbot functionality
5. ✅ Verify all pages load correctly

Then you're ready to deploy to production following [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)!

## Getting Help

- Check the [README.md](./README.md) for project overview
- See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for deployment
- Review [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) for recent changes
