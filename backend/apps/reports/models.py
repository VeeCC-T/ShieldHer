"""
Models for anonymous incident reports.
PRIVACY-FIRST: NO PII collected or stored.
"""

from django.db import models
from django.utils import timezone
from apps.core.models import TimeStampedModel
from apps.core.utils import encrypt_field, generate_confirmation_code
import uuid


class Report(TimeStampedModel):
    """
    Anonymous incident report - NO PII.
    Allows survivors to report digital violence anonymously.
    
    IMPORTANT: This model must NEVER contain:
    - Names
    - Email addresses
    - Phone numbers
    - IP addresses
    - User IDs or session identifiers
    
    Fields:
        confirmation_code: Non-identifying code for user reference
        incident_type: Type of incident
        description: Encrypted incident description
        timestamp: When the incident occurred
        location_free_text: Platform/context (not physical location)
        evidence_links: URLs to evidence (no file uploads)
        consent_for_followup: Whether user consents to followup
        redaction_applied: Whether PII was detected and redacted
    """
    INCIDENT_TYPE_CHOICES = [
        ('harassment', 'Harassment'),
        ('stalking', 'Stalking'),
        ('impersonation', 'Impersonation'),
        ('threats', 'Threats'),
        ('other', 'Other'),
    ]
    
    confirmation_code = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        help_text="Non-identifying confirmation code"
    )
    incident_type = models.CharField(
        max_length=20,
        choices=INCIDENT_TYPE_CHOICES,
        db_index=True,
        help_text="Type of incident"
    )
    description = models.TextField(
        help_text="Encrypted incident description"
    )
    timestamp = models.DateTimeField(
        help_text="When the incident occurred"
    )
    location_free_text = models.CharField(
        max_length=200,
        blank=True,
        help_text="Platform/context (not physical location)"
    )
    evidence_links = models.JSONField(
        default=list,
        blank=True,
        help_text="URLs to evidence (no file uploads)"
    )
    consent_for_followup = models.BooleanField(
        default=False,
        help_text="Whether user consents to followup"
    )
    redaction_applied = models.BooleanField(
        default=False,
        help_text="Whether PII redaction was applied"
    )
    
    # NO fields for: name, email, phone, IP, user_id
    
    class Meta:
        verbose_name = "Report"
        verbose_name_plural = "Reports"
        db_table = "reports"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['incident_type', '-created_at']),
            models.Index(fields=['confirmation_code']),
        ]
    
    def save(self, *args, **kwargs):
        """
        Override save to:
        1. Generate confirmation code if not set
        2. Encrypt description before saving
        """
        if not self.confirmation_code:
            self.confirmation_code = generate_confirmation_code(prefix="SH")
        
        # Encrypt description if not already encrypted
        # (Check if it looks like encrypted data)
        if self.description and not self.description.startswith('gAAAAA'):
            self.description = encrypt_field(self.description)
        
        super().save(*args, **kwargs)
    
    def get_decrypted_description(self):
        """
        Get decrypted description.
        Only for admin viewing - never expose in public API.
        """
        from apps.core.utils import decrypt_field
        try:
            return decrypt_field(self.description)
        except Exception:
            return "[Unable to decrypt]"
    
    def __str__(self):
        return f"Report {self.confirmation_code} ({self.get_incident_type_display()})"
