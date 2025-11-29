@echo off
REM Generate required security keys for production deployment (Windows)

echo === ShieldHer Production Keys Generator ===
echo.

REM Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

echo Generating Django SECRET_KEY...
for /f "delims=" %%i in ('python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"') do set DJANGO_SECRET_KEY=%%i
echo DJANGO_SECRET_KEY=%DJANGO_SECRET_KEY%
echo.

echo Generating JWT_SECRET_KEY...
for /f "delims=" %%i in ('python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"') do set JWT_SECRET_KEY=%%i
echo JWT_SECRET_KEY=%JWT_SECRET_KEY%
echo.

echo Generating ENCRYPTION_KEY (Fernet)...
for /f "delims=" %%i in ('python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"') do set ENCRYPTION_KEY=%%i
echo ENCRYPTION_KEY=%ENCRYPTION_KEY%
echo.

echo === Copy these values to your Render environment variables ===
echo.
echo IMPORTANT: Keep these keys secure and never commit them to version control!
echo.

pause
