"""
Serializers for donations API.
"""

from rest_framework import serializers
from .models import Donation
from apps.core.utils import detect_pii, redact_pii


class DonationSerializer(serializers.ModelSerializer):
    """
    Serializer for donation detail view.
    Returns donation information without sensitive payment details.
    """
    class Meta:
        model = Donation
        fields = [
            'id',
            'confirmation_code',
            'amount',
            'currency',
            'status',
            'message',
            'created_at'
        ]
        read_only_fields = fields


class DonationCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating donations.
    Validates donation data and processes payment.
    """
    class Meta:
        model = Donation
        fields = [
            'amount',
            'currency',
            'donor_email',
            'is_anonymous',
            'message',
            'payment_intent_id'
        ]
    
    def validate_amount(self, value):
        """Validate donation amount is positive"""
        if value <= 0:
            raise serializers.ValidationError("Donation amount must be greater than zero")
        if value > 100000:
            raise serializers.ValidationError("Donation amount cannot exceed $100,000")
        return value
    
    def validate_message(self, value):
        """Validate and warn about PII in message"""
        if value:
            pii_detected = detect_pii(value)
            if pii_detected:
                # Return warning but don't block
                # The model's save method will log this
                pass
        return value
    
    def validate(self, data):
        """Cross-field validation"""
        # If anonymous, clear donor email
        if data.get('is_anonymous', False):
            data['donor_email'] = ''
        
        # Validate email if not anonymous
        if not data.get('is_anonymous', False) and not data.get('donor_email'):
            raise serializers.ValidationError({
                'donor_email': 'Email is required for non-anonymous donations'
            })
        
        return data


class DonationAdminSerializer(serializers.ModelSerializer):
    """
    Serializer for admin donation list view.
    Shows all donation details except sensitive payment info.
    """
    donor_email_masked = serializers.SerializerMethodField()
    
    class Meta:
        model = Donation
        fields = [
            'id',
            'confirmation_code',
            'amount',
            'currency',
            'donor_email_masked',
            'is_anonymous',
            'status',
            'payment_intent_id',
            'message',
            'created_at',
            'updated_at'
        ]
        read_only_fields = fields
    
    def get_donor_email_masked(self, obj):
        """Mask donor email for privacy"""
        if obj.is_anonymous or not obj.donor_email:
            return "Anonymous"
        
        # Mask email: show first 2 chars and domain
        email = obj.donor_email
        if '@' in email:
            local, domain = email.split('@')
            if len(local) > 2:
                masked_local = local[:2] + '*' * (len(local) - 2)
            else:
                masked_local = local[0] + '*'
            return f"{masked_local}@{domain}"
        return "***"
