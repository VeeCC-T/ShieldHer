"""
Custom logging filters for ShieldHer.
Removes sensitive data from logs to protect privacy.
"""

import logging
import re


class SensitiveDataFilter(logging.Filter):
    """
    Filter that removes sensitive data from log records.
    Prevents IP addresses and other PII from being logged.
    """
    
    # Patterns to redact
    IP_PATTERN = re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b')
    EMAIL_PATTERN = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    
    def filter(self, record):
        """
        Filter log record to remove sensitive data.
        """
        if hasattr(record, 'msg'):
            # Redact IP addresses
            record.msg = self.IP_PATTERN.sub('[IP_REDACTED]', str(record.msg))
            # Redact email addresses
            record.msg = self.EMAIL_PATTERN.sub('[EMAIL_REDACTED]', record.msg)
        
        return True
