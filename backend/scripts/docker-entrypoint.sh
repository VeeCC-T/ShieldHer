#!/bin/bash
set -e

echo "Running migrations..."
python manage.py migrate --noinput

if [ "${SEED_DATA}" = "true" ]; then
    echo "Seeding initial data..."
    python manage.py seed_initial_data || echo "Seed command failed or models missing"
fi

echo "Creating superuser if not exists..."
python manage.py shell <<EOF
from apps.authentication.models import AdminUser
from django.contrib.auth import get_user_model
import os

User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'shieldher-admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@shieldher.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'presvee123')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser '{username}' created successfully")
else:
    print(f"Superuser '{username}' already exists")
EOF

echo "Starting server..."
exec "$@"
