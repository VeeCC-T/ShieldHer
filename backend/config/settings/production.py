"""
Production settings for ShieldHer project.
"""

from .base import *
import dj_database_url

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',')

# Database - Use DATABASE_URL environment variable
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True,
    )
}

# Security settings for production
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'True') == 'True'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Add WhiteNoise middleware for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# Email backend for production
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')

# Static files - Use WhiteNoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Logging - Console output for Render, with optional file logging
LOGGING['handlers']['console'] = {
    'class': 'logging.StreamHandler',
    'formatter': 'verbose',
    'filters': ['remove_sensitive_data'],
}

LOGGING['root']['handlers'] = ['console']
LOGGING['loggers']['django']['handlers'] = ['console']
LOGGING['loggers']['apps']['handlers'] = ['console']

# Optional file logging if logs directory exists
import os
if os.path.exists(BASE_DIR / 'logs'):
    LOGGING['handlers']['file'] = {
        'class': 'logging.handlers.RotatingFileHandler',
        'filename': BASE_DIR / 'logs' / 'django.log',
        'maxBytes': 1024 * 1024 * 10,  # 10 MB
        'backupCount': 5,
        'formatter': 'verbose',
        'filters': ['remove_sensitive_data'],
    }
    LOGGING['root']['handlers'].append('file')
    LOGGING['loggers']['django']['handlers'].append('file')
    LOGGING['loggers']['apps']['handlers'].append('file')
