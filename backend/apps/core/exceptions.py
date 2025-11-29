"""
Custom exception handler for ShieldHer API.
Returns safe, generic error messages without revealing system internals.
"""

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns safe error messages.
    Prevents information disclosure about system internals.
    """
    # Call DRF's default exception handler first
    response = exception_handler(exc, context)
    
    if response is not None:
        # Customize the response format
        custom_response_data = {
            'error': {
                'message': str(response.data.get('detail', 'An error occurred')),
                'status': response.status_code
            }
        }
        
        # Add field errors for validation errors
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            if isinstance(response.data, dict) and 'detail' not in response.data:
                custom_response_data['error']['fields'] = response.data
        
        response.data = custom_response_data
    else:
        # Handle unexpected errors
        logger.error(f"Unhandled exception: {exc}", exc_info=True)
        response = Response(
            {
                'error': {
                    'message': 'An unexpected error occurred. Please try again later.',
                    'status': status.HTTP_500_INTERNAL_SERVER_ERROR
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    return response
