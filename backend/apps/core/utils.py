"""
Core utilities for ShieldHer platform.
Provides encryption, validation, and helper functions.
"""

import os
from cryptography.fernet import Fernet
from django.conf import settings
import base64
import logging

logger = logging.getLogger(__name__)


def get_encryption_key():
    """
    Get the encryption key from settings.
    Ensures the key is properly formatted for Fernet.
    """
    key = settings.ENCRYPTION_KEY
    
    # If key is not already base64 encoded, encode it
    if not key:
        raise ValueError("ENCRYPTION_KEY not set in settings")
    
    try:
        # Try to use it as-is first
        Fernet(key.encode() if isinstance(key, str) else key)
        return key.encode() if isinstance(key, str) else key
    except Exception:
        # If that fails, generate a proper key
        logger.warning("Invalid encryption key format, generating new key")
        return Fernet.generate_key()


def encrypt_field(value):
    """
    Encrypt a field value using Fernet symmetric encryption.
    
    Args:
        value (str): The value to encrypt
        
    Returns:
        str: The encrypted value as a string
    """
    if not value:
        return value
    
    try:
        key = get_encryption_key()
        f = Fernet(key)
        
        # Convert to bytes if string
        if isinstance(value, str):
            value = value.encode('utf-8')
        
        # Encrypt and return as string
        encrypted = f.encrypt(value)
        return encrypted.decode('utf-8')
    except Exception as e:
        logger.error(f"Encryption error: {e}")
        raise


def decrypt_field(encrypted_value):
    """
    Decrypt a field value using Fernet symmetric encryption.
    
    Args:
        encrypted_value (str): The encrypted value
        
    Returns:
        str: The decrypted value as a string
    """
    if not encrypted_value:
        return encrypted_value
    
    try:
        key = get_encryption_key()
        f = Fernet(key)
        
        # Convert to bytes if string
        if isinstance(encrypted_value, str):
            encrypted_value = encrypted_value.encode('utf-8')
        
        # Decrypt and return as string
        decrypted = f.decrypt(encrypted_value)
        return decrypted.decode('utf-8')
    except Exception as e:
        logger.error(f"Decryption error: {e}")
        raise


def generate_confirmation_code(prefix="SH"):
    """
    Generate a unique, non-identifying confirmation code.
    
    Args:
        prefix (str): Prefix for the code (default: "SH")
        
    Returns:
        str: A confirmation code like "SH-2025-A7B9C2"
    """
    import uuid
    from django.utils import timezone
    
    year = timezone.now().year
    random_part = uuid.uuid4().hex[:6].upper()
    
    return f"{prefix}-{year}-{random_part}"
