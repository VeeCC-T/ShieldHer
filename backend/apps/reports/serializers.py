"""
Serializers for anonymous reports.
PRIVACY-FIRST: NO PII collected or stored.
"""

from rest_framework import serializers
from .models import Report
from .utils import process_report_text, validate_no_pii


class ReportCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating anonymous reports.
    PUBLIC endpoint - NO authentication required.
    
    PRIVACY RULES:
    - NO name fields
    - NO email fields
    - NO phone fields
    - NO IP logging
    - NO user identifiers
    - Automatic PII detection and redaction
    """
    
    class Meta:
        model = Report
        fields = [
            'incident_type',
            'description',
            'timestamp',
            'location_free_text',
            'evidence_links',
            'consent_for_followup',
        ]
    
    def validate_description(self, value):
        """
        Validate description for PII.
        Redact if PII is detected.
        """
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError("Description cannot be empty")
        
        if len(value) > 5000:
            raise serializers.ValidationError("Description is too long (max 5000 characters)")
        
        # Process for PII - will redact if found
        redacted_text, redaction_applied = process_report_text(value)
        
        # Store the redacted version
        return redacted_text
    
    def validate_location_free_text(self, value):
        """
        Validate location is platform/context, not physical address.
        """
        if value and len(value) > 200:
            raise serializers.ValidationError("Location description is too long (max 200 characters)")
        
        # Check for potential physical address patterns
        address_patterns = ['street', 'avenue', 'road', 'apt', 'apartment', 'house number']
        lower_value = value.lower() if value else ''
        
        for pattern in address_patterns:
            if pattern in lower_value:
                raise serializers.ValidationError(
                    "Please do not include physical addresses. "
                    "Use platform names or general context instead (e.g., 'Facebook', 'Instagram DM')."
                )
        
        return value
    
    def validate_evidence_links(self, value):
        """
        Validate evidence links are URLs only.
        NO file uploads to prevent metadata leakage.
        """
        if not isinstance(value, list):
            raise serializers.ValidationError("Evidence links must be a list of URLs")
        
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 evidence links allowed")
        
        # Validate each link is a URL
        for link in value:
            if not isinstance(link, str):
                raise serializers.ValidationError("Each evidence link must be a string URL")
            
            if not link.startswith(('http://', 'https://')):
                raise serializers.ValidationError(f"Invalid URL: {link}")
        
        return value
    
    def create(self, validated_data):
        """
        Create report with automatic PII redaction flag.
        """
        # Check if redaction was applied
        original_description = self.initial_data.get('description', '')
        final_description = validated_data.get('description', '')
        
        redaction_applied = original_description != final_description
        validated_data['redaction_applied'] = redaction_applied
        
        return super().create(validated_data)


class ReportListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing reports (admin only).
    Returns encrypted description - admin must decrypt to view.
    """
    
    class Meta:
        model = Report
        fields = [
            'id',
            'confirmation_code',
            'incident_type',
            'timestamp',
            'location_free_text',
            'evidence_links',
            'consent_for_followup',
            'redaction_applied',
            'created_at',
        ]
        read_only_fields = fields


class ReportDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for report details (admin only).
    Includes decrypted description for admin viewing.
    """
    decrypted_description = serializers.SerializerMethodField()
    
    class Meta:
        model = Report
        fields = [
            'id',
            'confirmation_code',
            'incident_type',
            'decrypted_description',
            'timestamp',
            'location_free_text',
            'evidence_links',
            'consent_for_followup',
            'redaction_applied',
            'created_at',
            'updated_at',
        ]
        read_only_fields = fields
    
    def get_decrypted_description(self, obj):
        """
        Decrypt description for admin viewing.
        Only accessible by authenticated admins.
        """
        return obj.get_decrypted_description()


class ReportStatsSerializer(serializers.Serializer):
    """
    Serializer for aggregated report statistics (admin only).
    NO individual report data - only counts and trends.
    """
    total_reports = serializers.IntegerField()
    reports_by_type = serializers.DictField()
    reports_by_month = serializers.DictField()
    redaction_rate = serializers.FloatField()
