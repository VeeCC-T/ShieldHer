"""
Admin interface for lessons.
"""

from django.contrib import admin
from .models import Lesson


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """
    Admin interface for managing lessons.
    """
    list_display = ['title', 'category', 'difficulty', 'duration_minutes', 'published', 'created_at']
    list_filter = ['category', 'difficulty', 'published', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'thumbnail_url')
        }),
        ('Classification', {
            'fields': ('category', 'difficulty', 'duration_minutes')
        }),
        ('Content', {
            'fields': ('content', 'quiz')
        }),
        ('Publishing', {
            'fields': ('published',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Show all lessons to admins"""
        return super().get_queryset(request)
