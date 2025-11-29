@echo off
echo ========================================
echo ShieldHer - Setup Database & Admin
echo ========================================
echo.
echo This script will:
echo 1. Run database migrations
echo 2. Create a superuser account
echo.
echo Make sure services are running first!
echo (Run start.bat in another terminal)
echo.
pause

echo.
echo [1/2] Running database migrations...
docker compose exec backend python manage.py migrate

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Migration failed!
    echo Make sure services are running: docker compose up
    pause
    exit /b 1
)

echo.
echo [OK] Migrations completed successfully!
echo.
echo [2/2] Creating superuser account...
echo Please follow the prompts:
echo.

docker compose exec backend python manage.py createsuperuser

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Superuser creation failed or cancelled
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo You can now:
echo 1. Access Frontend:  http://localhost:5173
echo 2. Access Admin:     http://localhost:8000/admin
echo 3. Check API Health: http://localhost:8000/api/health/
echo.
pause
