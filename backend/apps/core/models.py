"""
Core models for ShieldHer platform.
Provides base models and utilities for all apps.
"""

from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """
    Abstract base model that provides timestamp fields.
    All models should inherit from this to ensure consistent timestamps.
    
    Fields:
        created_at: Automatically set when record is created
        updated_at: Automatically updated when record is modified
    """
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when record was created"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when record was last updated"
    )
    
    class Meta:
        abstract = True
        ordering = ['-created_at']
        get_latest_by = 'created_at'
    
    def __str__(self):
        return f"{self.__class__.__name__} (created: {self.created_at})"



class AuditLog(TimeStampedModel):
    """
    Audit log for tracking admin actions.
    Records all administrative actions for accountability and security.
    
    Fields:
        admin_user: The admin who performed the action
        action: Type of action (create, update, delete, view)
        resource_type: Type of resource affected
        resource_id: ID of the affected resource
        details: Additional details about the action (JSON)
        success: Whether the action succeeded
    """
    ACTION_CHOICES = [
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('view', 'View'),
    ]
    
    admin_user = models.ForeignKey(
        'authentication.AdminUser',
        on_delete=models.SET_NULL,
        null=True,
        related_name='audit_logs',
        help_text="Admin user who performed the action"
    )
    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES,
        help_text="Type of action performed"
    )
    resource_type = models.CharField(
        max_length=100,
        help_text="Type of resource (model name)"
    )
    resource_id = models.CharField(
        max_length=100,
        help_text="ID of the affected resource"
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional details about the action"
    )
    success = models.BooleanField(
        default=True,
        help_text="Whether the action succeeded"
    )
    
    class Meta:
        db_table = 'audit_logs'
        verbose_name = 'Audit Log'
        verbose_name_plural = 'Audit Logs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['admin_user', '-created_at']),
            models.Index(fields=['resource_type', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.action} on {self.resource_type} by {self.admin_user}"


def log_admin_action(admin_user, action, resource_type, resource_id, details=None, success=True):
    """
    Utility function to log admin actions.
    
    Args:
        admin_user: The AdminUser instance
        action: Action type ('create', 'update', 'delete', 'view')
        resource_type: Type of resource (model name)
        resource_id: ID of the resource
        details: Optional dict with additional details
        success: Whether the action succeeded
        
    Returns:
        AuditLog: The created audit log entry
    """
    return AuditLog.objects.create(
        admin_user=admin_user,
        action=action,
        resource_type=resource_type,
        resource_id=str(resource_id),
        details=details or {},
        success=success
    )
