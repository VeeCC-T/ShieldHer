#!/bin/bash
# Generate required security keys for production deployment

echo "=== ShieldHer Production Keys Generator ==="
echo ""

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo "Error: Python is not installed or not in PATH"
    exit 1
fi

echo "Generating Django SECRET_KEY..."
DJANGO_SECRET_KEY=$(python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
echo "DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY"
echo ""

echo "Generating JWT_SECRET_KEY..."
JWT_SECRET_KEY=$(python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
echo "JWT_SECRET_KEY=$JWT_SECRET_KEY"
echo ""

echo "Generating ENCRYPTION_KEY (Fernet)..."
ENCRYPTION_KEY=$(python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")
echo "ENCRYPTION_KEY=$ENCRYPTION_KEY"
echo ""

echo "=== Copy these values to your Render environment variables ==="
echo ""
echo "IMPORTANT: Keep these keys secure and never commit them to version control!"
echo ""

# Optional: Save to a file (add to .gitignore!)
read -p "Save to .env.production file? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cat > .env.production << EOF
# Generated on $(date)
# DO NOT COMMIT THIS FILE TO VERSION CONTROL!

DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY
JWT_SECRET_KEY=$JWT_SECRET_KEY
ENCRYPTION_KEY=$ENCRYPTION_KEY
EOF
    echo "Keys saved to .env.production"
    echo "Remember to add .env.production to .gitignore!"
fi
