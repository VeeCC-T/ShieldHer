"""
Custom pagination classes for ShieldHer API.
"""

from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    """
    Standard pagination for list endpoints.
    Returns consistent structure with results, count, next, previous.
    """
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
