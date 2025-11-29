"""
Models for emergency resources and hotlines.
"""

from django.db import models
from apps.core.models import TimeStampedModel


class Helpline(TimeStampedModel):
    """
    Emergency helpline contact information.
    Provides crisis support phone numbers and contact details.
    
    Fields:
        name: Helpline name
        phone_number: Contact phone number
        description: Helpline description
        category: Helpline category (crisis, legal, counseling, shelter, medical, other)
        availability: Availability hours description
        is_24_7: Whether available 24/7
        languages: Supported languages (JSON array)
        is_active: Whether helpline is currently active
        priority: Display priority (higher = shown first)
    """
    CATEGORY_CHOICES = [
        ('crisis', 'Crisis Support'),
        ('legal', 'Legal Assistance'),
        ('counseling', 'Counseling'),
        ('shelter', 'Shelter/Housing'),
        ('medical', 'Medical Services'),
        ('other', 'Other Support'),
    ]
    
    name = models.CharField(
        max_length=200,
        help_text="Helpline name"
    )
    phone_number = models.CharField(
        max_length=50,
        help_text="Contact phone number"
    )
    description = models.TextField(
        help_text="Helpline description"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        db_index=True,
        help_text="Helpline category"
    )
    availability = models.CharField(
        max_length=200,
        help_text="Availability hours (e.g., '24/7', 'Mon-Fri 9am-5pm')"
    )
    is_24_7 = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Whether available 24/7"
    )
    languages = models.JSONField(
        default=list,
        help_text="Supported languages"
    )
    is_active = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Whether helpline is currently active"
    )
    priority = models.IntegerField(
        default=0,
        db_index=True,
        help_text="Display priority (higher = shown first)"
    )
    
    class Meta:
        verbose_name = "Helpline"
        verbose_name_plural = "Helplines"
        db_table = "helplines"
        ordering = ['-priority', 'name']
        indexes = [
            models.Index(fields=['-priority', 'name']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['is_24_7', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.phone_number}"


class Resource(TimeStampedModel):
    """
    Educational resource for survivors.
    Provides information about legal rights, organizations, and support services.
    
    Fields:
        title: Resource title
        description: Brief description
        content: Full resource content (markdown or HTML)
        category: Resource category (legal_rights, safety_planning, organizations, laws, financial, healthcare)
        resource_type: Type of resource (article, guide, directory, law, organization)
        external_url: Optional external link
        is_published: Whether resource is visible to public
        tags: Searchable tags (JSON array)
    """
    CATEGORY_CHOICES = [
        ('legal_rights', 'Legal Rights'),
        ('safety_planning', 'Safety Planning'),
        ('organizations', 'Support Organizations'),
        ('laws', 'Laws & Legislation'),
        ('financial', 'Financial Assistance'),
        ('healthcare', 'Healthcare Resources'),
    ]
    
    TYPE_CHOICES = [
        ('article', 'Article'),
        ('guide', 'Guide'),
        ('directory', 'Directory'),
        ('law', 'Law/Legislation'),
        ('organization', 'Organization'),
    ]
    
    title = models.CharField(
        max_length=300,
        help_text="Resource title"
    )
    description = models.TextField(
        help_text="Brief resource description"
    )
    content = models.TextField(
        help_text="Full resource content"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        db_index=True,
        help_text="Resource category"
    )
    resource_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        db_index=True,
        help_text="Type of resource"
    )
    external_url = models.URLField(
        blank=True,
        help_text="Optional external link"
    )
    is_published = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Whether resource is published"
    )
    tags = models.JSONField(
        default=list,
        help_text="Searchable tags"
    )
    
    class Meta:
        verbose_name = "Resource"
        verbose_name_plural = "Resources"
        db_table = "resources"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'is_published']),
            models.Index(fields=['resource_type', 'is_published']),
        ]
    
    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
