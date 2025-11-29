@echo off
echo ========================================
echo ShieldHer Development Environment
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo [INFO] Docker is running...
echo.

REM Check if .env files exist
if not exist "backend\.env" (
    echo [INFO] Creating backend .env file...
    copy "backend\.env.example" "backend\.env"
)

if not exist "frontend\.env" (
    echo [INFO] Creating frontend .env file...
    copy "frontend\.env.example" "frontend\.env"
)

echo [INFO] Starting ShieldHer with Docker Compose...
echo.

docker-compose up --build

pause
