@echo off
echo ========================================
echo ShieldHer Local Development Startup
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

echo Starting services with Docker Compose...
echo This may take 3-5 minutes on first run.
echo.

REM Start services
docker compose up --build

echo.
echo ========================================
echo Services stopped
echo ========================================
pause
