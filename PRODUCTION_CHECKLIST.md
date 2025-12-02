# ShieldHer Backend - Production Deployment Checklist

## Pre-Deployment Checks

### 1. Environment Variables

- [ ] `DJANGO_SECRET_KEY` - Generate a strong random key
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `ENCRYPTION_KEY` - 32-byte Fernet key for field encryption
- [ ] `JWT_SECRET_KEY` - Separate key for JWT tokens
- [ ] `DJANGO_ALLOWED_HOSTS` - Your domain(s)
- [ ] `CORS_ALLOWED_ORIGINS` - Frontend URL(s)
- [ ] `DEBUG=False` - Always false in production

### 2. Database Setup

- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Verify all models have migrations
- [ ] Test database connection

### 3. Static Files

- [ ] Run `python manage.py collectstatic --noinput`
- [ ] Verify WhiteNoise is configured in settings
- [ ] Test static file serving

### 4. Security Configuration

- [ ] SSL/HTTPS enabled
- [ ] HSTS headers configured
- [ ] Secure cookies enabled
- [ ] XSS protection enabled
- [ ] CSRF protection verified

### 5. API Endpoints Testing

Test all public endpoints:

- [ ] `GET /api/health/` - Health check
- [ ] `GET /api/lessons/` - Lessons list
- [ ] `GET /api/lessons/categories/` - Lesson categories
- [ ] `GET /api/lessons/difficulties/` - Difficulty levels
- [ ] `GET /api/resources/` - Resources list
- [ ] `GET /api/helplines/` - Helplines list
- [ ] `POST /api/reports/` - Anonymous report submission
- [ ] `POST /api/chatbot/message/` - Chatbot message
- [ ] `GET /api/chatbot/suggestions/` - Chatbot suggestions
- [ ] `POST /api/donations/` - Donation submission

Test admin endpoints:

- [ ] `/admin/` - Admin panel access
- [ ] JWT authentication working
- [ ] Admin can create/edit lessons
- [ ] Admin can view reports (encrypted)

### 6. Logging

- [ ] Logs directory exists: `/app/logs/`
- [ ] File handler writing to `django.log`
- [ ] Sensitive data filter working
- [ ] Console logging to stdout for Render

### 7. Performance

- [ ] Database connection pooling configured
- [ ] Gunicorn worker count appropriate
- [ ] Static files compressed (WhiteNoise)
- [ ] Query optimization verified

### 8. Privacy & Compliance

- [ ] Reports model has NO PII fields
- [ ] Encryption working for sensitive fields
- [ ] Anonymous access verified for public endpoints
- [ ] No session tracking for anonymous users

## Post-Deployment Verification

### Smoke Tests

```bash
# Health check
curl https://your-backend.onrender.com/api/health/

# Lessons
curl https://your-backend.onrender.com/api/lessons/

# Resources
curl https://your-backend.onrender.com/api/resources/

# Helplines
curl https://your-backend.onrender.com/api/helplines/

# Admin panel
curl https://your-backend.onrender.com/admin/
```

### Load Testing

- [ ] Test concurrent requests
- [ ] Verify rate limiting
- [ ] Monitor response times
- [ ] Check memory usage

### Monitoring Setup

- [ ] Error tracking configured (optional: Sentry)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Database backup strategy
- [ ] Log rotation configured

## Common Issues & Solutions

### Issue: Database connection fails

- Verify `DATABASE_URL` format
- Check PostgreSQL service is running
- Ensure SSL is enabled in connection string

### Issue: Static files not loading

- Run `collectstatic` again
- Check `STATIC_ROOT` path
- Verify WhiteNoise middleware order

### Issue: CORS errors

- Check `CORS_ALLOWED_ORIGINS` includes frontend URL
- Verify protocol (http vs https)
- Test without trailing slash

### Issue: JWT authentication fails

- Check `JWT_SECRET_KEY` is set
- Verify token expiration times
- Test token refresh flow

### Issue: Encryption errors

- Generate valid Fernet key: `python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`
- Set `ENCRYPTION_KEY` in environment
- Re-save encrypted records if key changed

## Rollback Plan

1. Note current deployment version
2. Keep previous environment variables backed up
3. Document database migration state
4. Know how to revert to previous Docker image
5. Have admin credentials accessible offline
