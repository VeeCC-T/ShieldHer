"""
Admin interface for reports.
READ-ONLY to preserve evidence integrity.
"""

from django.contrib import admin
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    """
    Admin interface for viewing reports.
    READ-ONLY to preserve evidence integrity.
    """
    list_display = [
        'confirmation_code',
        'incident_type',
        'timestamp',
        'redaction_applied',
        'consent_for_followup',
        'created_at'
    ]
    list_filter = ['incident_type', 'redaction_applied', 'consent_for_followup', 'created_at']
    search_fields = ['confirmation_code', 'location_free_text']
    readonly_fields = [
        'confirmation_code',
        'incident_type',
        'description',
        'timestamp',
        'location_free_text',
        'evidence_links',
        'consent_for_followup',
        'redaction_applied',
        'created_at',
        'updated_at',
        'decrypted_description_display'
    ]
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Report Information', {
            'fields': ('confirmation_code', 'incident_type', 'timestamp')
        }),
        ('Content (Encrypted)', {
            'fields': ('description',),
            'description': 'This field is encrypted. Use the decrypted view below.'
        }),
        ('Content (Decrypted)', {
            'fields': ('decrypted_description_display',),
            'classes': ('wide',)
        }),
        ('Context', {
            'fields': ('location_free_text', 'evidence_links')
        }),
        ('Privacy & Consent', {
            'fields': ('consent_for_followup', 'redaction_applied')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def decrypted_description_display(self, obj):
        """Display decrypted description for admin viewing"""
        return obj.get_decrypted_description()
    decrypted_description_display.short_description = 'Description (Decrypted)'
    
    def has_add_permission(self, request):
        """Reports can only be created through API"""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Reports cannot be deleted to preserve evidence"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Reports cannot be modified to preserve evidence"""
        return False
