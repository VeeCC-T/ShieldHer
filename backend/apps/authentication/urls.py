"""
URL configuration for authentication.
"""

from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView

app_name = 'authentication'

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
]
