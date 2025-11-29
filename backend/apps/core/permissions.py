"""
Custom permissions for ShieldHer API.
"""

from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Permission class that allows only authenticated admin users.
    Used for admin-only endpoints.
    """
    
    def has_permission(self, request, view):
        """
        Check if user is authenticated and is an admin.
        """
        return (
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role in ['admin', 'moderator']
        )


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permission class that allows read access to anyone,
    but write access only to admin users.
    """
    
    def has_permission(self, request, view):
        """
        Allow GET, HEAD, OPTIONS to anyone.
        Require admin for POST, PUT, PATCH, DELETE.
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return (
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role in ['admin', 'moderator']
        )
