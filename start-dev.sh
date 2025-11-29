#!/bin/bash

echo "========================================"
echo "ShieldHer Development Environment"
echo "========================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "[ERROR] Docker is not running. Please start Docker."
    exit 1
fi

echo "[INFO] Docker is running..."
echo ""

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "[INFO] Creating backend .env file..."
    cp backend/.env.example backend/.env
fi

if [ ! -f "frontend/.env" ]; then
    echo "[INFO] Creating frontend .env file..."
    cp frontend/.env.example frontend/.env
fi

echo "[INFO] Starting ShieldHer with Docker Compose..."
echo ""

docker-compose up --build
