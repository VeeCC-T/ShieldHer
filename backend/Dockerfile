# Backend Dockerfile
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

# Install Python dependencies
COPY requirements/production.txt requirements/production.txt
COPY requirements/base.txt requirements/base.txt
RUN pip install --upgrade pip && \
    pip install -r requirements/production.txt

# Copy project
COPY . .

# Create necessary directories
RUN mkdir -p staticfiles media logs

# Copy and set permissions for entrypoint script
COPY scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Collect static files
RUN python manage.py collectstatic --noinput --settings=config.settings.production || true

# Expose port
EXPOSE 8000

# Use entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]

# Run with gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2"]
