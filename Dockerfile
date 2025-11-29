# Root Dockerfile for Render deployment
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements/production.txt requirements/production.txt
COPY backend/requirements/base.txt requirements/base.txt

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements/production.txt

# Copy backend project
COPY backend/ .

# Create necessary directories
RUN mkdir -p staticfiles media

# Collect static files (ignore errors during build)
RUN python manage.py collectstatic --noinput --settings=config.settings.production || true

# Expose port
EXPOSE 8000

# Run with gunicorn
CMD gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2
