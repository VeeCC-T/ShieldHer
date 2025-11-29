"""
Serializers for authentication.
"""

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import AdminUser


class AdminUserSerializer(serializers.ModelSerializer):
    """
    Serializer for AdminUser model.
    Used for user details in responses.
    """
    class Meta:
        model = AdminUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer that includes user details.
    Returns generic error messages to prevent user enumeration.
    """
    
    def validate(self, attrs):
        """
        Validate credentials and return tokens with user data.
        Returns generic error message on failure.
        """
        try:
            data = super().validate(attrs)
            
            # Add user details to response
            data['user'] = {
                'id': self.user.id,
                'username': self.user.username,
                'role': self.user.role,
            }
            
            return data
        except Exception:
            # Return generic error message (don't reveal if user exists)
            raise serializers.ValidationError(
                {'detail': 'Invalid credentials'},
                code='authentication_failed'
            )
    
    @classmethod
    def get_token(cls, user):
        """
        Add custom claims to token.
        """
        token = super().get_token(user)
        
        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role
        
        return token
