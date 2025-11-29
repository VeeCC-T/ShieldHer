"""
Admin interface for resources and helplines.
"""

from django.contrib import admin
from .models import Helpline, Resource


@admin.register(Helpline)
class HelplineAdmin(admin.ModelAdmin):
    """
    Admin interface for managing helplines.
    """
    list_display = ['name', 'phone_number', 'category', 'is_24_7', 'is_active', 'priority', 'created_at']
    list_filter = ['category', 'is_24_7', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'phone_number']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['priority', 'is_active']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'phone_number', 'description')
        }),
        ('Classification', {
            'fields': ('category', 'availability', 'is_24_7', 'languages')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'priority')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Show all helplines to admins"""
        return super().get_queryset(request)


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    """
    Admin interface for managing resources.
    """
    list_display = ['title', 'category', 'resource_type', 'is_published', 'created_at']
    list_filter = ['category', 'resource_type', 'is_published', 'created_at']
    search_fields = ['title', 'description', 'content', 'tags']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['is_published']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description')
        }),
        ('Content', {
            'fields': ('content', 'external_url')
        }),
        ('Classification', {
            'fields': ('category', 'resource_type', 'tags')
        }),
        ('Publishing', {
            'fields': ('is_published',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Show all resources to admins"""
        return super().get_queryset(request)
