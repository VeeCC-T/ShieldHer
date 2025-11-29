"""
Authentication views for ShieldHer platform.
"""

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from .serializers import CustomTokenObtainPairSerializer
import logging

logger = logging.getLogger(__name__)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom login view that uses our custom serializer.
    Returns JWT tokens with user details.
    Returns generic error messages to prevent user enumeration.
    """
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        """
        Handle login request.
        Log authentication attempts (success/failure) without revealing user existence.
        """
        try:
            response = super().post(request, *args, **kwargs)
            
            # Log successful authentication (without sensitive data)
            if response.status_code == status.HTTP_200_OK:
                logger.info("Admin authentication successful")
            
            return response
        except Exception as e:
            # Log failed authentication (generic message)
            logger.warning("Admin authentication failed")
            
            # Return generic error message
            return Response(
                {
                    'error': {
                        'message': 'Invalid credentials',
                        'status': status.HTTP_401_UNAUTHORIZED
                    }
                },
                status=status.HTTP_401_UNAUTHORIZED
            )


class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom token refresh view.
    """
    pass
