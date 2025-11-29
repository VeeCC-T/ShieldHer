"""
Serializers for resources and helplines API.
"""

from rest_framework import serializers
from .models import Helpline, Resource


class HelplineSerializer(serializers.ModelSerializer):
    """
    Serializer for helpline list and detail views.
    Returns all helpline information for public access.
    """
    class Meta:
        model = Helpline
        fields = [
            'id',
            'name',
            'phone_number',
            'description',
            'category',
            'availability',
            'is_24_7',
            'languages',
            'priority',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class HelplineCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating helplines (admin only).
    """
    class Meta:
        model = Helpline
        fields = [
            'name',
            'phone_number',
            'description',
            'category',
            'availability',
            'is_24_7',
            'languages',
            'is_active',
            'priority'
        ]
    
    def validate_phone_number(self, value):
        """Validate phone number is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Phone number is required")
        return value.strip()
    
    def validate_name(self, value):
        """Validate name is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Helpline name is required")
        return value.strip()
    
    def validate_languages(self, value):
        """Validate languages is a list"""
        if not isinstance(value, list):
            raise serializers.ValidationError("Languages must be a list")
        return value


class ResourceListSerializer(serializers.ModelSerializer):
    """
    Serializer for resource list view.
    Returns summary information for browsing.
    """
    class Meta:
        model = Resource
        fields = [
            'id',
            'title',
            'description',
            'category',
            'resource_type',
            'external_url',
            'tags',
            'created_at'
        ]
        read_only_fields = fields


class ResourceDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for resource detail view.
    Returns full resource content.
    """
    class Meta:
        model = Resource
        fields = [
            'id',
            'title',
            'description',
            'content',
            'category',
            'resource_type',
            'external_url',
            'tags',
            'created_at',
            'updated_at'
        ]
        read_only_fields = fields


class ResourceCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating resources (admin only).
    """
    class Meta:
        model = Resource
        fields = [
            'title',
            'description',
            'content',
            'category',
            'resource_type',
            'external_url',
            'is_published',
            'tags'
        ]
    
    def validate_title(self, value):
        """Validate title is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Title is required")
        return value.strip()
    
    def validate_tags(self, value):
        """Validate tags is a list"""
        if not isinstance(value, list):
            raise serializers.ValidationError("Tags must be a list")
        return value
