"""
Views for lessons API.
"""

from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from apps.core.permissions import IsAdminUser
from .models import Lesson
from .serializers import (
    LessonListSerializer,
    LessonDetailSerializer,
    LessonCreateSerializer
)


class LessonViewSet(viewsets.ModelViewSet):
    """
    ViewSet for lessons.
    
    Public endpoints (no auth required):
    - list: GET /api/lessons/
    - retrieve: GET /api/lessons/{id}/
    
    Admin endpoints (JWT required):
    - create: POST /api/lessons/
    - update: PUT/PATCH /api/lessons/{id}/
    - destroy: DELETE /api/lessons/{id}/
    """
    queryset = Lesson.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'difficulty', 'published']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title', 'duration_minutes']
    ordering = ['-created_at']
    
    def get_permissions(self):
        """
        Public can list and retrieve.
        Only admins can create, update, delete.
        """
        if self.action in ['list', 'retrieve', 'categories', 'difficulties']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        """
        if self.action == 'list':
            return LessonListSerializer
        elif self.action == 'retrieve':
            return LessonDetailSerializer
        return LessonCreateSerializer
    
    def get_queryset(self):
        """
        Public users only see published lessons.
        Admins see all lessons.
        """
        queryset = super().get_queryset()
        
        # If not admin, only show published lessons
        if not (self.request.user and self.request.user.is_authenticated):
            queryset = queryset.filter(published=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """
        Get list of available categories.
        GET /api/lessons/categories/
        """
        categories = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Lesson.CATEGORY_CHOICES
        ]
        return Response({'categories': categories})
    
    @action(detail=False, methods=['get'])
    def difficulties(self, request):
        """
        Get list of available difficulty levels.
        GET /api/lessons/difficulties/
        """
        difficulties = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Lesson.DIFFICULTY_CHOICES
        ]
        return Response({'difficulties': difficulties})
