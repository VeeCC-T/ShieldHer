"""
PII detection and redaction utilities for reports.
Protects user privacy by detecting and removing personally identifiable information.
"""

import re
import logging

logger = logging.getLogger(__name__)

# PII detection patterns
PII_PATTERNS = {
    'email': re.compile(
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
        re.IGNORECASE
    ),
    'phone': re.compile(
        r'\b(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b'
    ),
    'ssn': re.compile(
        r'\b\d{3}-\d{2}-\d{4}\b'
    ),
    'credit_card': re.compile(
        r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b'
    ),
    # Common name patterns (basic detection)
    'full_name': re.compile(
        r'\b(my name is|i am|i\'m|called)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)\b',
        re.IGNORECASE
    ),
}


def detect_pii(text):
    """
    Detect PII patterns in text.
    
    Args:
        text (str): Text to scan for PII
        
    Returns:
        list: List of PII types detected (e.g., ['email', 'phone'])
    """
    if not text:
        return []
    
    detected = []
    
    for pii_type, pattern in PII_PATTERNS.items():
        if pattern.search(text):
            detected.append(pii_type)
            logger.warning(f"PII detected in report: {pii_type}")
    
    return detected


def redact_pii(text):
    """
    Redact PII from text by replacing with [REDACTED].
    
    Args:
        text (str): Text to redact
        
    Returns:
        str: Text with PII redacted
    """
    if not text:
        return text
    
    redacted = text
    
    # Redact each PII type
    for pii_type, pattern in PII_PATTERNS.items():
        if pii_type == 'full_name':
            # Special handling for name patterns - redact the captured name
            redacted = pattern.sub(r'\1 [NAME_REDACTED]', redacted)
        else:
            redacted = pattern.sub(f'[{pii_type.upper()}_REDACTED]', redacted)
    
    return redacted


def process_report_text(text):
    """
    Process report text for PII.
    Detects PII and returns redacted text with flag.
    
    Args:
        text (str): Report text to process
        
    Returns:
        tuple: (redacted_text, redaction_applied)
            - redacted_text: Text with PII redacted
            - redaction_applied: Boolean indicating if redaction was needed
    """
    if not text:
        return text, False
    
    # Detect PII
    pii_detected = detect_pii(text)
    
    if pii_detected:
        # Log detection (without revealing content)
        logger.warning(
            f"PII detected in report submission. Types: {', '.join(pii_detected)}"
        )
        
        # Redact PII
        redacted_text = redact_pii(text)
        
        return redacted_text, True
    
    return text, False


def validate_no_pii(text):
    """
    Validate that text contains no PII.
    Raises ValidationError if PII is detected.
    
    Args:
        text (str): Text to validate
        
    Returns:
        bool: True if no PII detected
        
    Raises:
        ValidationError: If PII is detected
    """
    from rest_framework.exceptions import ValidationError
    
    pii_detected = detect_pii(text)
    
    if pii_detected:
        raise ValidationError({
            'detail': 'Your submission contains personally identifiable information. '
                     'For your safety, please remove any names, email addresses, '
                     'phone numbers, or other identifying information and resubmit.',
            'pii_types': pii_detected
        })
    
    return True
