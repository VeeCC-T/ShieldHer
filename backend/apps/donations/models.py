"""
Models for donations.
PRIVACY-FIRST: Minimal donor information, optional anonymity.
"""

from django.db import models
from apps.core.models import TimeStampedModel
from apps.core.utils import generate_confirmation_code, detect_pii


class Donation(TimeStampedModel):
    """
    Donation record with optional donor information.
    Supports both anonymous and identified donations.
    
    PRIVACY NOTES:
    - Donor email is optional and only for receipt purposes
    - No payment card details are ever stored
    - Messages are scanned for PII and can be redacted
    - Anonymous donations hide all donor information
    
    Fields:
        amount: Donation amount
        currency: Currency code (USD, EUR, etc.)
        donor_email: Optional email for receipt (blank if anonymous)
        is_anonymous: Whether donation is anonymous
        status: Donation status (pending, completed, failed, refunded)
        payment_intent_id: Payment processor reference (unique)
        message: Optional message from donor
        confirmation_code: Non-identifying code for donor reference
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Donation amount"
    )
    currency = models.CharField(
        max_length=3,
        default='USD',
        help_text="Currency code"
    )
    donor_email = models.EmailField(
        blank=True,
        help_text="Optional donor email for receipt"
    )
    is_anonymous = models.BooleanField(
        default=False,
        help_text="Whether donation is anonymous"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        db_index=True,
        help_text="Donation status"
    )
    payment_intent_id = models.CharField(
        max_length=255,
        unique=True,
        help_text="Payment processor reference"
    )
    message = models.TextField(
        blank=True,
        help_text="Optional message from donor"
    )
    confirmation_code = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        help_text="Non-identifying confirmation code"
    )
    
    class Meta:
        verbose_name = "Donation"
        verbose_name_plural = "Donations"
        db_table = "donations"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', '-created_at']),
            models.Index(fields=['confirmation_code']),
            models.Index(fields=['payment_intent_id']),
        ]
    
    def save(self, *args, **kwargs):
        """
        Override save to generate confirmation code and check for PII in message.
        """
        if not self.confirmation_code:
            self.confirmation_code = generate_confirmation_code(prefix="DON")
        
        # Detect PII in message if present
        if self.message:
            pii_detected = detect_pii(self.message)
            if pii_detected:
                # Log warning but don't block - admin can review
                import logging
                logger = logging.getLogger(__name__)
                logger.warning(
                    f"PII detected in donation message for {self.confirmation_code}: {pii_detected}"
                )
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Donation {self.confirmation_code} - {self.amount} {self.currency}"
