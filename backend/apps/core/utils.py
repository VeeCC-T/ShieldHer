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


def detect_pii(text):
    """
    Detect potential PII (Personally Identifiable Information) in text.
    
    Args:
        text (str): Text to check for PII
        
    Returns:
        list: List of detected PII types (e.g., ['email', 'phone'])
    """
    import re
    
    if not text:
        return []
    
    detected = []
    
    # Email detection
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if re.search(email_pattern, text):
        detected.append('email')
    
    # Phone number detection (various formats)
    phone_patterns = [
        r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',  # 123-456-7890 or 1234567890
        r'\b\(\d{3}\)\s*\d{3}[-.]?\d{4}\b',  # (123) 456-7890
        r'\b\+\d{1,3}[-.]?\d{1,14}\b',  # International format
    ]
    for pattern in phone_patterns:
        if re.search(pattern, text):
            detected.append('phone')
            break
    
    # Name detection (simple heuristic: capitalized words that might be names)
    # This is a basic check and may have false positives
    name_pattern = r'\b[A-Z][a-z]+ [A-Z][a-z]+\b'
    if re.search(name_pattern, text):
        detected.append('possible_name')
    
    # Address detection (street numbers)
    address_pattern = r'\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b'
    if re.search(address_pattern, text, re.IGNORECASE):
        detected.append('address')
    
    # Social security number (US format)
    ssn_pattern = r'\b\d{3}-\d{2}-\d{4}\b'
    if re.search(ssn_pattern, text):
        detected.append('ssn')
    
    return detected


def redact_pii(text, detected_pii=None):
    """
    Redact PII (Personally Identifiable Information) from text.
    
    Args:
        text (str): Text to redact PII from
        detected_pii (list): Optional list of already detected PII types
        
    Returns:
        str: Text with PII redacted
    """
    import re
    
    if not text:
        return text
    
    # If PII types not provided, detect them first
    if detected_pii is None:
        detected_pii = detect_pii(text)
    
    redacted_text = text
    
    # Redact emails
    if 'email' in detected_pii:
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        redacted_text = re.sub(email_pattern, '[EMAIL REDACTED]', redacted_text)
    
    # Redact phone numbers
    if 'phone' in detected_pii:
        phone_patterns = [
            r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
            r'\b\(\d{3}\)\s*\d{3}[-.]?\d{4}\b',
            r'\b\+\d{1,3}[-.]?\d{1,14}\b',
        ]
        for pattern in phone_patterns:
            redacted_text = re.sub(pattern, '[PHONE REDACTED]', redacted_text)
    
    # Redact SSN
    if 'ssn' in detected_pii:
        ssn_pattern = r'\b\d{3}-\d{2}-\d{4}\b'
        redacted_text = re.sub(ssn_pattern, '[SSN REDACTED]', redacted_text)
    
    # Redact addresses
    if 'address' in detected_pii:
        address_pattern = r'\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b'
        redacted_text = re.sub(address_pattern, '[ADDRESS REDACTED]', redacted_text, flags=re.IGNORECASE)
    
    return redacted_text
