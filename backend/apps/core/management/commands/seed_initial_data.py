from django.core.management.base import BaseCommand
from django.db import transaction


class Command(BaseCommand):
    help = "Populate initial data for helplines, lessons, and resources if missing."

    def handle(self, *args, **options):
        created_counts = {}

        with transaction.atomic():
            # Helplines
            try:
                from apps.resources.models import Helpline
                defaults = [
                    {"name": "Local Hotline", "phone_number": "123-456-7890", "region": "US", "active": True},
                    {"name": "Nearby Clinic", "phone_number": "555-000-0000", "region": "US", "active": True},
                    {"name": "Community Center", "phone_number": "555-111-2222", "region": "US", "active": True},
                ]
                c = 0
                for d in defaults:
                    obj, created = Helpline.objects.get_or_create(name=d["name"], defaults=d)
                    c += 1 if created else 0
                created_counts["helplines"] = c
            except Exception as e:
                created_counts["helplines_error"] = str(e)

            # Lessons
            try:
                from apps.lessons.models import Lesson
                lessons = [
                    {"title": "Recognizing Online Harassment", "slug": "recognize-harassment", "content": "Basics of identifying harassment patterns online."},
                    {"title": "Protecting Your Accounts", "slug": "protect-accounts", "content": "How to enable 2FA and secure passwords."},
                    {"title": "Reporting & Blocking", "slug": "report-block", "content": "Steps to report abuse on common platforms."},
                ]
                c = 0
                for d in lessons:
                    obj, created = Lesson.objects.get_or_create(slug=d["slug"], defaults=d)
                    c += 1 if created else 0
                created_counts["lessons"] = c
            except Exception as e:
                created_counts["lessons_error"] = str(e)

            # Resources
            try:
                from apps.resources.models import Resource
                resources = [
                    {"title": "Safety Planning Guide", "url": "https://example.org/safety-plan", "category": "safety"},
                    {"title": "Password Managers", "url": "https://example.org/password-managers", "category": "security"},
                    {"title": "Platform Reporting Links", "url": "https://example.org/platform-reporting", "category": "reporting"},
                ]
                c = 0
                for d in resources:
                    obj, created = Resource.objects.get_or_create(url=d["url"], defaults=d)
                    c += 1 if created else 0
                created_counts["resources"] = c
            except Exception as e:
                created_counts["resources_error"] = str(e)

        self.stdout.write(self.style.SUCCESS(f"Seed completed: {created_counts}"))
