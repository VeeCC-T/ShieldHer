# ShieldHer Deployment Guide

This guide covers deploying ShieldHer to production environments.

## Table of Contents
- [Quick Start with Docker](#quick-start-with-docker)
- [Manual Deployment](#manual-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Environment Configuration](#environment-configuration)
- [Security Checklist](#security-checklist)

## Quick Start with Docker

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/VeeCC-T/ShieldHer.git
cd shieldher
```

2. **Configure environment variables**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your settings

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your settings
```

3. **Build and start services**
```bash
docker-compose up --build
```

4. **Create superuser (in a new terminal)**
```bash
docker-compose exec backend python manage.py createsuperuser
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin

## Manual Deployment

### Backend (Django)

#### 1. System Requirements
- Python 3.9+
- PostgreSQL 13+
- Redis 6+ (optional, for caching)

#### 2. Setup Steps

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/production.txt

# Configure environment
cp .env.example .env
# Edit .env with production settings

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser
python manage.py createsuperuser

# Start with Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

### Frontend (React + Vite)

#### 1. System Requirements
- Node.js 18+
- npm 9+

#### 2. Setup Steps

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with production API URL

# Build for production
npm run build

# Serve with a static server (example with serve)
npm install -g serve
serve -s dist -l 5173
```

## Cloud Deployment

### Option 1: Railway (Recommended for Quick Deploy)

#### Backend
1. Create new project on Railway
2. Add PostgreSQL database
3. Connect GitHub repository
4. Set environment variables:
   - `DEBUG=False`
   - `SECRET_KEY=<your-secret-key>`
   - `DATABASE_URL=<auto-provided>`
   - `ALLOWED_HOSTS=<your-domain>`
5. Deploy from `backend` directory

#### Frontend
1. Create new project on Railway
2. Connect GitHub repository
3. Set environment variables:
   - `VITE_API_BASE_URL=<backend-url>`
4. Deploy from `frontend` directory

### Option 2: AWS (Production-Grade)

#### Backend (Elastic Beanstalk)
```bash
# Install EB CLI
pip install awsebcli

# Initialize
cd backend
eb init -p python-3.11 shieldher-backend

# Create environment
eb create shieldher-backend-prod

# Deploy
eb deploy
```

#### Frontend (S3 + CloudFront)
```bash
# Build
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://shieldher-frontend --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

### Option 3: Heroku

#### Backend
```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create shieldher-backend

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=<your-secret-key>
heroku config:set ALLOWED_HOSTS=<your-domain>

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# Create superuser
heroku run python manage.py createsuperuser
```

#### Frontend (Vercel)
```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Environment Configuration

### Backend (.env)

```env
# Django Settings
DEBUG=False
SECRET_KEY=<generate-with-django-secret-key-generator>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=31536000

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email (for notifications)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Storage (AWS S3)
USE_S3=True
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_STORAGE_BUCKET_NAME=shieldher-media
AWS_S3_REGION_NAME=us-east-1
```

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com

# App Configuration
VITE_APP_NAME=ShieldHer
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
```

## Security Checklist

### Pre-Deployment

- [ ] Change `SECRET_KEY` to a strong, random value
- [ ] Set `DEBUG=False` in production
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Enable HTTPS/SSL certificates
- [ ] Set secure cookie flags
- [ ] Configure CORS properly
- [ ] Review and update security headers
- [ ] Enable HSTS
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Review file upload restrictions
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable database connection pooling
- [ ] Set up CDN for static files

### Post-Deployment

- [ ] Test all critical features
- [ ] Verify SSL certificate
- [ ] Test panic exit functionality
- [ ] Verify anonymous reporting works
- [ ] Test emergency helplines
- [ ] Check mobile responsiveness
- [ ] Run security scan (OWASP ZAP)
- [ ] Test accessibility (WAVE, axe)
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Configure backup schedule
- [ ] Document incident response plan

## SSL/TLS Configuration

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already configured by certbot)
sudo certbot renew --dry-run
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        root /var/www/shieldher/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /static {
        alias /var/www/shieldher/backend/staticfiles;
    }

    # Media files
    location /media {
        alias /var/www/shieldher/backend/media;
    }
}
```

## Database Backup

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/shieldher"
DB_NAME="shieldher"
DB_USER="shieldher_user"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U $DB_USER $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Keep only last 30 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: db_backup_$DATE.sql.gz"
```

### Cron Job (Daily at 2 AM)

```bash
crontab -e

# Add this line:
0 2 * * * /path/to/backup.sh >> /var/log/shieldher_backup.log 2>&1
```

## Monitoring

### Health Check Endpoints

Backend provides health check at:
- `GET /api/health/` - Basic health check
- `GET /api/health/db/` - Database connectivity check

### Recommended Monitoring Tools

- **Uptime**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Performance**: New Relic, DataDog
- **Logs**: Papertrail, Loggly

## Scaling

### Horizontal Scaling

1. **Load Balancer**: Use Nginx or AWS ALB
2. **Multiple Backend Instances**: Run multiple Gunicorn workers
3. **Database**: Use read replicas for read-heavy operations
4. **Caching**: Implement Redis for session and API caching
5. **CDN**: Use CloudFront or Cloudflare for static assets

### Performance Optimization

```python
# backend/config/settings/production.py

# Database connection pooling
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'CONN_MAX_AGE': 600,
        'OPTIONS': {
            'connect_timeout': 10,
        }
    }
}

# Caching
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Static files compression
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

## Troubleshooting

### Common Issues

**Issue**: Static files not loading
```bash
# Solution
python manage.py collectstatic --noinput
```

**Issue**: Database connection errors
```bash
# Check database is running
pg_isready -h localhost -p 5432

# Test connection
psql -U shieldher_user -d shieldher -h localhost
```

**Issue**: CORS errors
```python
# backend/config/settings/production.py
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]
```

## Support

For deployment issues:
- GitHub Issues: https://github.com/your-org/shieldher/issues
- Documentation: https://docs.shieldher.org
- Email: support@shieldher.org

---

**Last Updated**: 2024
**Version**: 1.0.0
