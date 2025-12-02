"""
Development settings for ShieldHer project.
"""

from .base import *
try:
    import dj_database_url
except Exception:
    dj_database_url = None

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Allow all hosts in development
ALLOWED_HOSTS = ['*']

# Database - Support both DATABASE_URL and individual env vars
if os.environ.get('DATABASE_URL') and dj_database_url:
    DATABASES = {
        'default': dj_database_url.config(
            default=os.environ.get('DATABASE_URL'),
            conn_max_age=600,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('DB_NAME', 'shieldher'),
            'USER': os.environ.get('DB_USER', 'shieldher_user'),
            'PASSWORD': os.environ.get('DB_PASSWORD', 'shieldher_pass'),
            'HOST': os.environ.get('DB_HOST', 'localhost'),
            'PORT': os.environ.get('DB_PORT', '5432'),
            'CONN_MAX_AGE': 600,
        }
    }

# Email backend for development (console)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Django Debug Toolbar (optional, can be added later)
# INSTALLED_APPS += ['debug_toolbar']
# MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
# INTERNAL_IPS = ['127.0.0.1']

# CORS - Allow all origins in development
CORS_ALLOW_ALL_ORIGINS = True

# Disable HTTPS redirect in development
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
