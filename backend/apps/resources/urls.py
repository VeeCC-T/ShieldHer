"""
URL configuration for resources and helplines API.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HelplineViewSet,
    ResourceViewSet,
    chatbot_message,
    chatbot_suggestions
)

app_name = 'resources'

router = DefaultRouter()
router.register(r'helplines', HelplineViewSet, basename='helpline')
router.register(r'resources', ResourceViewSet, basename='resource')

urlpatterns = [
    path('', include(router.urls)),
    path('chatbot/message/', chatbot_message, name='chatbot-message'),
    path('chatbot/suggestions/', chatbot_suggestions, name='chatbot-suggestions'),
]
