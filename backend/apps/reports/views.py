"""
Views for anonymous reports.
PRIVACY-FIRST: NO IP logging, NO user tracking.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from apps.core.permissions import IsAdminUser
from .models import Report
from .serializers import (
    ReportCreateSerializer,
    ReportListSerializer,
    ReportDetailSerializer,
    ReportStatsSerializer
)
import logging

logger = logging.getLogger(__name__)


class ReportViewSet(viewsets.ModelViewSet):
    """
    ViewSet for anonymous reports.
    
    PUBLIC endpoint (no auth):
    - create: POST /api/reports/
    
    ADMIN endpoints (JWT required):
    - list: GET /api/reports/
    - retrieve: GET /api/reports/{id}/
    - stats: GET /api/reports/stats/
    
    PRIVACY PROTECTION:
    - NO IP logging
    - NO user identification
    - NO session tracking
    - Rate limited to prevent abuse
    """
    queryset = Report.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['incident_type', 'redaction_applied']
    
    def get_permissions(self):
        """
        Public can create reports anonymously.
        Only admins can list and view reports.
        """
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        """
        if self.action == 'create':
            return ReportCreateSerializer
        elif self.action == 'retrieve':
            return ReportDetailSerializer
        elif self.action == 'stats':
            return ReportStatsSerializer
        return ReportListSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Create anonymous report.
        
        PRIVACY PROTECTIONS:
        - NO IP address logged
        - NO user agent logged
        - NO session cookies set
        - Automatic PII detection and redaction
        - Rate limited (configured in middleware)
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create report
        report = serializer.save()
        
        # Log report creation (NO identifying info)
        logger.info(
            f"Anonymous report created: {report.confirmation_code} "
            f"(type: {report.incident_type}, redacted: {report.redaction_applied})"
        )
        
        # Return confirmation code
        return Response(
            {
                'confirmation_code': report.confirmation_code,
                'message': 'Your report has been submitted securely and anonymously. '
                          'Save this confirmation code for your records.',
                'redaction_applied': report.redaction_applied,
                'redaction_message': 'Some personally identifiable information was '
                                   'automatically removed for your safety.' 
                                   if report.redaction_applied else None
            },
            status=status.HTTP_201_CREATED
        )
    
    def list(self, request, *args, **kwargs):
        """
        List reports (admin only).
        Returns paginated list without decrypted descriptions.
        """
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        """
        Get report details (admin only).
        Includes decrypted description.
        Logs admin access for audit trail.
        """
        instance = self.get_object()
        
        # Log admin access (for audit)
        from apps.core.models import log_admin_action
        log_admin_action(
            admin_user=request.user,
            action='view',
            resource_type='Report',
            resource_id=instance.id,
            details={'confirmation_code': instance.confirmation_code}
        )
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get aggregated report statistics (admin only).
        Returns ONLY aggregated data, NO individual reports.
        
        GET /api/reports/stats/
        """
        # Total reports
        total_reports = Report.objects.count()
        
        # Reports by type
        reports_by_type = dict(
            Report.objects.values('incident_type')
            .annotate(count=Count('id'))
            .values_list('incident_type', 'count')
        )
        
        # Reports by month (last 12 months)
        twelve_months_ago = timezone.now() - timedelta(days=365)
        reports_by_month = {}
        
        for i in range(12):
            month_start = timezone.now() - timedelta(days=30 * i)
            month_end = timezone.now() - timedelta(days=30 * (i - 1))
            month_key = month_start.strftime('%Y-%m')
            
            count = Report.objects.filter(
                created_at__gte=month_start,
                created_at__lt=month_end
            ).count()
            
            reports_by_month[month_key] = count
        
        # Redaction rate
        redacted_count = Report.objects.filter(redaction_applied=True).count()
        redaction_rate = (redacted_count / total_reports * 100) if total_reports > 0 else 0
        
        stats_data = {
            'total_reports': total_reports,
            'reports_by_type': reports_by_type,
            'reports_by_month': reports_by_month,
            'redaction_rate': round(redaction_rate, 2)
        }
        
        serializer = self.get_serializer(stats_data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def incident_types(self, request):
        """
        Get list of available incident types.
        GET /api/reports/incident_types/
        """
        incident_types = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Report.INCIDENT_TYPE_CHOICES
        ]
        return Response({'incident_types': incident_types})
