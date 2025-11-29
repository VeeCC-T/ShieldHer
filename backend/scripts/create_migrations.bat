@echo off
REM Script to create initial migrations for all apps (Windows)

echo Creating migrations for ShieldHer apps...

REM Create migrations for each app
python manage.py makemigrations core
python manage.py makemigrations authentication
python manage.py makemigrations lessons
python manage.py makemigrations reports
python manage.py makemigrations resources
python manage.py makemigrations donations

echo Migrations created successfully!
echo Run 'python manage.py migrate' to apply migrations to the database.
