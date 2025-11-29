"""
Views for donations API.
"""

from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.core.permissions import IsAdminUser
from .models import Donation
from .serializers import (
    DonationSerializer,
    DonationCreateSerializer,
    DonationAdminSerializer
)
from .payment import process_payment


class DonationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for donations.
    
    Public endpoints (no auth required):
    - create: POST /api/donations/
    - retrieve: GET /api/donations/{confirmation_code}/
    
    Admin endpoints (JWT required):
    - list: GET /api/donations/
    """
    queryset = Donation.objects.all()
    lookup_field = 'confirmation_code'
    
    def get_permissions(self):
        """
        Public can create and retrieve by confirmation code.
        Only admins can list all donations.
        """
        if self.action in ['create', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    def get_serializer_class(self):
        """
        Use different serializers for different actions.
        """
        if self.action == 'create':
            return DonationCreateSerializer
        elif self.action == 'list':
            return DonationAdminSerializer
        return DonationSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Create a new donation and process payment.
        POST /api/donations/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract payment data
        amount = serializer.validated_data['amount']
        currency = serializer.validated_data.get('currency', 'USD')
        
        # Process payment using mock processor
        payment_result = process_payment(
            amount=amount,
            currency=currency,
            payment_method=request.data.get('payment_method')
        )
        
        if not payment_result['success']:
            return Response(
                {
                    'error': 'Payment processing failed',
                    'detail': payment_result.get('error', 'Unknown error')
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update payment intent ID from processor
        serializer.validated_data['payment_intent_id'] = payment_result['payment_intent_id']
        serializer.validated_data['status'] = 'completed'
        
        # Save donation
        donation = serializer.save()
        
        # Return success response
        response_serializer = DonationSerializer(donation)
        return Response(
            {
                'success': True,
                'message': 'Thank you for your donation!',
                'donation': response_serializer.data
            },
            status=status.HTTP_201_CREATED
        )
    
    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve donation by confirmation code.
        GET /api/donations/{confirmation_code}/
        """
        try:
            donation = self.get_object()
            serializer = self.get_serializer(donation)
            return Response(serializer.data)
        except Donation.DoesNotExist:
            return Response(
                {'error': 'Donation not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def list(self, request, *args, **kwargs):
        """
        List all donations (admin only).
        GET /api/donations/
        """
        queryset = self.filter_queryset(self.get_queryset())
        
        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def stats(self, request):
        """
        Get donation statistics (admin only).
        GET /api/donations/stats/
        """
        from django.db.models import Sum, Count, Avg
        
        total_donations = Donation.objects.filter(status='completed').aggregate(
            total_amount=Sum('amount'),
            count=Count('id'),
            average=Avg('amount')
        )
        
        return Response({
            'total_amount': float(total_donations['total_amount'] or 0),
            'total_count': total_donations['count'],
            'average_amount': float(total_donations['average'] or 0),
            'currency': 'USD'
        })
