"""
Serializers for lessons API.
"""

from rest_framework import serializers
from .models import Lesson


class LessonListSerializer(serializers.ModelSerializer):
    """
    Serializer for lesson list view.
    Returns summary information for browsing.
    """
    class Meta:
        model = Lesson
        fields = [
            'id',
            'title',
            'description',
            'category',
            'difficulty',
            'duration_minutes',
            'thumbnail_url',
            'created_at'
        ]
        read_only_fields = fields


class LessonDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for lesson detail view.
    Returns full lesson content including quiz.
    """
    class Meta:
        model = Lesson
        fields = [
            'id',
            'title',
            'description',
            'category',
            'difficulty',
            'duration_minutes',
            'content',
            'quiz',
            'thumbnail_url',
            'created_at',
            'updated_at'
        ]
        read_only_fields = fields


class LessonCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating lessons (admin only).
    """
    class Meta:
        model = Lesson
        fields = [
            'title',
            'description',
            'category',
            'difficulty',
            'duration_minutes',
            'content',
            'quiz',
            'thumbnail_url',
            'published'
        ]
    
    def validate_content(self, value):
        """Validate content structure"""
        if not isinstance(value, dict):
            raise serializers.ValidationError("Content must be a JSON object")
        
        if 'sections' not in value:
            raise serializers.ValidationError("Content must have 'sections' field")
        
        return value
    
    def validate_quiz(self, value):
        """Validate quiz structure"""
        if not isinstance(value, list):
            raise serializers.ValidationError("Quiz must be a list of questions")
        
        for question in value:
            if not isinstance(question, dict):
                raise serializers.ValidationError("Each quiz question must be an object")
            
            required_fields = ['question', 'options', 'correct_answer']
            for field in required_fields:
                if field not in question:
                    raise serializers.ValidationError(f"Quiz question missing '{field}' field")
        
        return value
