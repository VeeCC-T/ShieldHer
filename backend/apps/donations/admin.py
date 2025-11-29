"""
Admin interface for donations.
"""

from django.contrib import admin
from .models import Donation


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    """
    Admin interface for managing donations.
    Sensitive payment details are never displayed.
    """
    list_display = [
        'confirmation_code',
        'amount',
        'currency',
        'masked_email',
        'is_anonymous',
        'status',
        'created_at'
    ]
    list_filter = ['status', 'is_anonymous', 'currency', 'created_at']
    search_fields = ['confirmation_code', 'payment_intent_id']
    readonly_fields = [
        'confirmation_code',
        'payment_intent_id',
        'created_at',
        'updated_at'
    ]
    
    fieldsets = (
        ('Donation Information', {
            'fields': ('confirmation_code', 'amount', 'currency', 'status')
        }),
        ('Donor Information', {
            'fields': ('donor_email', 'is_anonymous', 'message'),
            'description': 'Donor information is kept private and secure.'
        }),
        ('Payment Details', {
            'fields': ('payment_intent_id',),
            'description': 'Payment processor reference only. No card details are stored.'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def masked_email(self, obj):
        """Display masked email for privacy"""
        if obj.is_anonymous or not obj.donor_email:
            return "Anonymous"
        
        email = obj.donor_email
        if '@' in email:
            local, domain = email.split('@')
            if len(local) > 2:
                masked_local = local[:2] + '*' * (len(local) - 2)
            else:
                masked_local = local[0] + '*'
            return f"{masked_local}@{domain}"
        return "***"
    
    masked_email.short_description = "Donor Email"
    
    def get_queryset(self, request):
        """Show all donations to admins"""
        return super().get_queryset(request)
    
    def has_delete_permission(self, request, obj=None):
        """Prevent deletion of completed donations"""
        if obj and obj.status == 'completed':
            return False
        return super().has_delete_permission(request, obj)
