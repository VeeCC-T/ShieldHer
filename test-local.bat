@echo off
echo ========================================
echo ShieldHer - Quick Test Suite
echo ========================================
echo.
echo Testing all API endpoints...
echo.

echo [1/7] Testing health check...
curl -s http://localhost:8000/api/health/ | findstr "ok"
if %ERRORLEVEL% EQU 0 (echo [OK] Health check passed) else (echo [FAIL] Health check failed)
echo.

echo [2/7] Testing lessons API...
curl -s http://localhost:8000/api/lessons/ >nul 2>&1
if %ERRORLEVEL% EQU 0 (echo [OK] Lessons API accessible) else (echo [FAIL] Lessons API failed)
echo.

echo [3/7] Testing resources API...
curl -s http://localhost:8000/api/resources/ >nul 2>&1
if %ERRORLEVEL% EQU 0 (echo [OK] Resources API accessible) else (echo [FAIL] Resources API failed)
echo.

echo [4/7] Testing helplines API...
curl -s http://localhost:8000/api/helplines/ >nul 2>&1
if %ERRORLEVEL% EQU 0 (echo [OK] Helplines API accessible) else (echo [FAIL] Helplines API failed)
echo.

echo [5/7] Testing lesson categories...
curl -s http://localhost:8000/api/lessons/categories/ >nul 2>&1
if %ERRORLEVEL% EQU 0 (echo [OK] Lesson categories accessible) else (echo [FAIL] Lesson categories failed)
echo.

echo [6/7] Testing chatbot suggestions...
curl -s http://localhost:8000/api/chatbot/suggestions/ >nul 2>&1
if %ERRORLEVEL% EQU 0 (echo [OK] Chatbot suggestions accessible) else (echo [FAIL] Chatbot suggestions failed)
echo.

echo [7/7] Testing frontend...
curl -s http://localhost:5173 >nul 2>&1
if %ERRORLEVEL% EQU 0 (echo [OK] Frontend accessible) else (echo [FAIL] Frontend failed)
echo.

echo ========================================
echo Test Summary
echo ========================================
echo.
echo If all tests passed, your application is ready!
echo.
echo Open in browser:
echo - Frontend:  http://localhost:5173
echo - Admin:     http://localhost:8000/admin
echo - API Docs:  http://localhost:8000/api/health/
echo.
pause
