"""
URL configuration for ShieldHer project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from apps.core.views import health_check

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Health check
    path('api/health/', health_check, name='health-check'),
    
    # Authentication
    path('api/auth/', include('apps.authentication.urls')),
    
    # App URLs
    path('api/lessons/', include('apps.lessons.urls')),
    path('api/reports/', include('apps.reports.urls')),
    path('api/', include('apps.resources.urls')),
    path('api/donations/', include('apps.donations.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Customize admin site
admin.site.site_header = "ShieldHer Administration"
admin.site.site_title = "ShieldHer Admin"
admin.site.index_title = "Welcome to ShieldHer Administration"
