"""
Admin interface for core models.
"""

from django.contrib import admin
from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """
    Admin interface for audit logs.
    Read-only to preserve audit trail integrity.
    """
    list_display = ['created_at', 'admin_user', 'action', 'resource_type', 'resource_id', 'success']
    list_filter = ['action', 'resource_type', 'success', 'created_at']
    search_fields = ['admin_user__username', 'resource_type', 'resource_id']
    readonly_fields = ['created_at', 'updated_at', 'admin_user', 'action', 'resource_type', 'resource_id', 'details', 'success']
    date_hierarchy = 'created_at'
    
    def has_add_permission(self, request):
        """Audit logs cannot be manually created"""
        return False
    
    def has_delete_permission(self, request, obj=None):
        """Audit logs cannot be deleted"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Audit logs cannot be modified"""
        return False
