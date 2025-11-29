"""
Core views for ShieldHer platform.
"""

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
from django.utils import timezone


@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint to verify system status.
    Returns database connection status and timestamp.
    """
    try:
        # Check database connection
        connection.ensure_connection()
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    
    return Response({
        'status': 'ok' if db_status == 'connected' else 'degraded',
        'timestamp': timezone.now().isoformat(),
        'database': db_status,
        'version': '1.0.0'
    })
