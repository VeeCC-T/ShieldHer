"""
Views for resources and helplines API.
"""

from rest_framework import viewsets, filters, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from apps.core.permissions import IsAdminUser
from .models import Helpline, Resource
from .serializers import (
    HelplineSerializer,
    HelplineCreateSerializer,
    ResourceListSerializer,
    ResourceDetailSerializer,
    ResourceCreateSerializer
)
from .chatbot import get_chatbot_response, EnhancedChatbot


class HelplineViewSet(viewsets.ModelViewSet):
    """
    ViewSet for helplines.
    
    Public endpoints (no auth required):
    - list: GET /api/helplines/
    - retrieve: GET /api/helplines/{id}/
    
    Admin endpoints (JWT required):
    - create: POST /api/helplines/
    - update: PUT/PATCH /api/helplines/{id}/
    - destroy: DELETE /api/helplines/{id}/
    """
    queryset = Helpline.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_24_7', 'is_active']
    search_fields = ['name', 'description', 'phone_number']
    ordering_fields = ['priority', 'name', 'created_at']
    ordering = ['-priority', 'name']
    
    def get_permissions(self):
        """
        Public can list and retrieve.
        Only admins can create, update, delete.
        """
        if self.action in ['list', 'retrieve', 'categories']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        """
        if self.action in ['create', 'update', 'partial_update']:
            return HelplineCreateSerializer
        return HelplineSerializer
    
    def get_queryset(self):
        """
        Public users only see active helplines.
        Admins see all helplines.
        """
        queryset = super().get_queryset()
        
        # If not admin, only show active helplines
        if not (self.request.user and self.request.user.is_authenticated):
            queryset = queryset.filter(is_active=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """
        Get list of available helpline categories.
        GET /api/helplines/categories/
        """
        categories = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Helpline.CATEGORY_CHOICES
        ]
        return Response({'categories': categories})


class ResourceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for resources.
    
    Public endpoints (no auth required):
    - list: GET /api/resources/
    - retrieve: GET /api/resources/{id}/
    
    Admin endpoints (JWT required):
    - create: POST /api/resources/
    - update: PUT/PATCH /api/resources/{id}/
    - destroy: DELETE /api/resources/{id}/
    """
    queryset = Resource.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'resource_type', 'is_published']
    search_fields = ['title', 'description', 'content', 'tags']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']
    
    def get_permissions(self):
        """
        Public can list and retrieve.
        Only admins can create, update, delete.
        """
        if self.action in ['list', 'retrieve', 'categories', 'types']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        """
        if self.action == 'list':
            return ResourceListSerializer
        elif self.action == 'retrieve':
            return ResourceDetailSerializer
        return ResourceCreateSerializer
    
    def get_queryset(self):
        """
        Public users only see published resources.
        Admins see all resources.
        """
        queryset = super().get_queryset()
        
        # If not admin, only show published resources
        if not (self.request.user and self.request.user.is_authenticated):
            queryset = queryset.filter(is_published=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """
        Get list of available resource categories.
        GET /api/resources/categories/
        """
        categories = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Resource.CATEGORY_CHOICES
        ]
        return Response({'categories': categories})
    
    @action(detail=False, methods=['get'])
    def types(self, request):
        """
        Get list of available resource types.
        GET /api/resources/types/
        """
        types = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Resource.TYPE_CHOICES
        ]
        return Response({'types': types})



@api_view(['POST'])
@permission_classes([AllowAny])
def chatbot_message(request):
    """
    Process chatbot message and return enhanced response.
    POST /api/chatbot/message/
    
    Request body:
    {
        "message": "I need help",
        "conversation_history": []  // optional
    }
    
    Response:
    {
        "response": "...",
        "category": "crisis",
        "follow_up": "...",  // optional
        "timestamp": "2024-01-15T10:30:00Z"
    }
    """
    from django.utils import timezone
    
    message = request.data.get('message', '')
    conversation_history = request.data.get('conversation_history', [])
    
    if not message or not message.strip():
        return Response(
            {'error': 'Message is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get enhanced chatbot response
    result = get_chatbot_response(message, conversation_history)
    
    response_data = {
        'response': result['response'],
        'category': result['category'],
        'timestamp': timezone.now().isoformat()
    }
    
    # Include follow-up question if available
    if result.get('follow_up'):
        response_data['follow_up'] = result['follow_up']
    
    return Response(response_data)


@api_view(['GET'])
@permission_classes([AllowAny])
def chatbot_suggestions(request):
    """
    Get suggested questions for chatbot.
    GET /api/chatbot/suggestions/
    
    Response:
    {
        "suggestions": ["...", "..."]
    }
    """
    suggestions = EnhancedChatbot.get_suggested_questions()
    
    return Response({
        'suggestions': suggestions
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def chatbot_resources(request):
    """
    Get quick access emergency resources.
    GET /api/chatbot/resources/
    
    Response:
    {
        "resources": [
            {
                "name": "...",
                "contact": "...",
                "description": "...",
                "type": "phone|text|emergency"
            }
        ]
    }
    """
    resources = EnhancedChatbot.get_quick_resources()
    
    return Response({
        'resources': resources
    })
