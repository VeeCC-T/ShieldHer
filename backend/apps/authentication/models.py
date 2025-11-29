"""
Authentication models for ShieldHer platform.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminUser(AbstractUser):
    """
    Custom user model for admin authentication.
    Only admins have accounts - public users are anonymous.
    
    Fields:
        role: User role (admin or moderator)
        All fields from AbstractUser (username, email, password, etc.)
    """
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('moderator', 'Moderator'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='moderator',
        help_text="User role for permissions"
    )
    
    class Meta:
        verbose_name = "Admin User"
        verbose_name_plural = "Admin Users"
        db_table = "admin_users"
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    def is_admin(self):
        """Check if user is an administrator"""
        return self.role == 'admin'
    
    def is_moderator(self):
        """Check if user is a moderator"""
        return self.role == 'moderator'
