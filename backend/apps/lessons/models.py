"""
Models for digital literacy lessons.
"""

from django.db import models
from apps.core.models import TimeStampedModel


class Lesson(TimeStampedModel):
    """
    Digital literacy lesson content.
    Provides educational content for users to learn about digital safety.
    
    Fields:
        title: Lesson title
        description: Brief description
        category: Lesson category (privacy, safety, security, awareness)
        duration_minutes: Estimated completion time
        difficulty: Difficulty level (beginner, intermediate, advanced)
        content: Structured lesson content (JSON)
        quiz: Quiz questions and answers (JSON)
        thumbnail_url: URL to lesson thumbnail image
        published: Whether lesson is visible to public
    """
    CATEGORY_CHOICES = [
        ('privacy', 'Privacy'),
        ('safety', 'Safety'),
        ('security', 'Security'),
        ('awareness', 'Awareness'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    title = models.CharField(
        max_length=200,
        help_text="Lesson title"
    )
    description = models.TextField(
        help_text="Brief lesson description"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        db_index=True,
        help_text="Lesson category"
    )
    duration_minutes = models.PositiveIntegerField(
        help_text="Estimated completion time in minutes"
    )
    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        db_index=True,
        help_text="Difficulty level"
    )
    content = models.JSONField(
        help_text="Structured lesson content"
    )
    quiz = models.JSONField(
        default=list,
        blank=True,
        help_text="Quiz questions and answers"
    )
    thumbnail_url = models.URLField(
        blank=True,
        help_text="Lesson thumbnail image URL"
    )
    published = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Whether lesson is published"
    )
    
    class Meta:
        verbose_name = "Lesson"
        verbose_name_plural = "Lessons"
        db_table = "lessons"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'published']),
            models.Index(fields=['difficulty', 'published']),
        ]
    
    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
