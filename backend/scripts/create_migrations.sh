#!/bin/bash
# Script to create initial migrations for all apps

echo "Creating migrations for ShieldHer apps..."

# Create migrations for each app
python manage.py makemigrations core
python manage.py makemigrations authentication
python manage.py makemigrations lessons
python manage.py makemigrations reports
python manage.py makemigrations resources
python manage.py makemigrations donations

echo "Migrations created successfully!"
echo "Run 'python manage.py migrate' to apply migrations to the database."
