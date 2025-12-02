"""
Management command to populate database with sample data.
Usage: python manage.py populate_sample_data
"""

from django.core.management.base import BaseCommand
from apps.lessons.models import Lesson
from apps.resources.models import Resource, Helpline


class Command(BaseCommand):
    help = 'Populates the database with sample lessons, resources, and helplines'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting sample data population...'))
        
        # Create sample lessons
        self.create_lessons()
        
        # Create sample resources
        self.create_resources()
        
        # Create sample helplines
        self.create_helplines()
        
        self.stdout.write(self.style.SUCCESS('✅ Sample data population completed!'))

    def create_lessons(self):
        """Create sample digital literacy lessons"""
        self.stdout.write('Creating sample lessons...')
        
        lessons = [
            {
                'title': 'Protecting Your Online Privacy',
                'description': 'Learn essential techniques to safeguard your personal information online and maintain digital privacy.',
                'category': 'privacy',
                'duration_minutes': 15,
                'difficulty': 'beginner',
                'content': {
                    'sections': [
                        {
                            'title': 'Understanding Privacy',
                            'content': 'Privacy online means controlling who can access your personal information. This includes your photos, messages, location, and browsing history.'
                        },
                        {
                            'title': 'Privacy Settings',
                            'content': 'Most social media platforms have privacy settings. Go to Settings > Privacy and review who can see your posts, photos, and personal information.'
                        },
                        {
                            'title': 'Think Before Sharing',
                            'content': 'Once information is online, it can be difficult to remove. Always consider: Would I be comfortable with everyone seeing this?'
                        }
                    ]
                },
                'quiz': [
                    {
                        'question': 'What should you check before posting personal information online?',
                        'options': ['Privacy settings', 'Friend count', 'Phone battery', 'Weather'],
                        'correct_answer': 0
                    },
                    {
                        'question': 'Can information posted online be completely erased?',
                        'options': ['Yes, always', 'No, it may remain accessible', 'Only on weekends', 'Only with permission'],
                        'correct_answer': 1
                    }
                ],
                'published': True
            },
            {
                'title': 'Recognizing Online Harassment',
                'description': 'Identify different forms of digital harassment and learn how to respond effectively.',
                'category': 'awareness',
                'duration_minutes': 20,
                'difficulty': 'beginner',
                'content': {
                    'sections': [
                        {
                            'title': 'What is Online Harassment?',
                            'content': 'Online harassment includes cyberbullying, stalking, threats, unwanted messages, sharing private photos without consent, and impersonation.'
                        },
                        {
                            'title': 'Warning Signs',
                            'content': 'Watch for: repeated unwanted contact, threatening messages, sharing your private information, creating fake profiles about you, or monitoring your online activity.'
                        },
                        {
                            'title': 'Document Everything',
                            'content': 'Save screenshots of messages, posts, and profiles. Include dates and times. This evidence is crucial for reporting.'
                        }
                    ]
                },
                'quiz': [
                    {
                        'question': 'Which of these is online harassment?',
                        'options': ['Repeated unwanted messages', 'A single friendly comment', 'Liking a public post', 'Following someone'],
                        'correct_answer': 0
                    }
                ],
                'published': True
            },
            {
                'title': 'Creating Strong Passwords',
                'description': 'Master the art of creating secure passwords and protecting your online accounts.',
                'category': 'security',
                'duration_minutes': 10,
                'difficulty': 'beginner',
                'content': {
                    'sections': [
                        {
                            'title': 'Password Basics',
                            'content': 'A strong password is at least 12 characters long, combines uppercase and lowercase letters, numbers, and symbols. Avoid personal information like birthdays or names.'
                        },
                        {
                            'title': 'Unique Passwords',
                            'content': 'Use a different password for each account. If one account is compromised, others remain safe. Consider using a password manager.'
                        },
                        {
                            'title': 'Two-Factor Authentication',
                            'content': 'Enable 2FA on all important accounts. This adds an extra security layer requiring a code from your phone in addition to your password.'
                        }
                    ]
                },
                'quiz': [
                    {
                        'question': 'How long should a strong password be?',
                        'options': ['At least 6 characters', 'At least 8 characters', 'At least 12 characters', 'At least 20 characters'],
                        'correct_answer': 2
                    }
                ],
                'published': True
            },
            {
                'title': 'Social Media Safety Tips',
                'description': 'Navigate social media platforms safely while protecting your personal information and wellbeing.',
                'category': 'safety',
                'duration_minutes': 18,
                'difficulty': 'intermediate',
                'content': {
                    'sections': [
                        {
                            'title': 'Profile Privacy',
                            'content': 'Set your profile to private. Review friend/follower requests carefully. Be cautious of accepting strangers.'
                        },
                        {
                            'title': 'Location Safety',
                            'content': 'Disable location services for social apps. Avoid posting real-time location updates. Be careful with check-ins and geotagged photos.'
                        },
                        {
                            'title': 'Blocking and Reporting',
                            'content': 'Know how to block users and report inappropriate content. Most platforms have tools to report harassment, threats, or fake accounts.'
                        }
                    ]
                },
                'quiz': [
                    {
                        'question': 'Why should you disable location services?',
                        'options': ['To save battery', 'To prevent stalking and tracking', 'To get better photos', 'To load pages faster'],
                        'correct_answer': 1
                    }
                ],
                'published': True
            },
            {
                'title': 'Identifying Phishing Attempts',
                'description': 'Learn to recognize and avoid phishing scams that try to steal your personal information.',
                'category': 'security',
                'duration_minutes': 15,
                'difficulty': 'intermediate',
                'content': {
                    'sections': [
                        {
                            'title': 'What is Phishing?',
                            'content': 'Phishing is when attackers pretend to be legitimate organizations to trick you into sharing passwords, credit card numbers, or other sensitive data.'
                        },
                        {
                            'title': 'Red Flags',
                            'content': 'Warning signs: urgent language, misspellings, suspicious links, requests for personal information, unfamiliar sender addresses.'
                        },
                        {
                            'title': 'How to Verify',
                            'content': 'Never click links in suspicious emails. Instead, go directly to the official website. Contact the organization through official channels to verify requests.'
                        }
                    ]
                },
                'quiz': [
                    {
                        'question': 'What should you do with a suspicious email requesting your password?',
                        'options': ['Reply with your password', 'Click the link to verify', 'Delete it immediately', 'Forward to friends'],
                        'correct_answer': 2
                    }
                ],
                'published': True
            },
            {
                'title': 'Digital Footprint Management',
                'description': 'Understand and control your online presence and the trail of data you leave behind.',
                'category': 'privacy',
                'duration_minutes': 22,
                'difficulty': 'advanced',
                'content': {
                    'sections': [
                        {
                            'title': 'What is a Digital Footprint?',
                            'content': 'Your digital footprint is the trail of data you leave when using the internet - posts, comments, likes, searches, and browsing history.'
                        },
                        {
                            'title': 'Active vs Passive Footprints',
                            'content': 'Active footprints are data you deliberately share. Passive footprints are collected without your direct knowledge through cookies, trackers, and data brokers.'
                        },
                        {
                            'title': 'Cleanup Strategies',
                            'content': 'Regularly Google yourself. Delete old accounts. Review and clean social media history. Use privacy-focused browsers and search engines.'
                        }
                    ]
                },
                'quiz': [
                    {
                        'question': 'What is a passive digital footprint?',
                        'options': ['Data you deliberately share', 'Data collected without direct knowledge', 'Your password list', 'Your email inbox'],
                        'correct_answer': 1
                    }
                ],
                'published': True
            }
        ]
        
        for lesson_data in lessons:
            lesson, created = Lesson.objects.get_or_create(
                title=lesson_data['title'],
                defaults=lesson_data
            )
            if created:
                self.stdout.write(f'  ✓ Created lesson: {lesson.title}')
            else:
                self.stdout.write(f'  ⊘ Lesson already exists: {lesson.title}')

    def create_resources(self):
        """Create sample educational resources"""
        self.stdout.write('Creating sample resources...')
        
        resources = [
            {
                'title': 'Your Legal Rights Against Digital Violence',
                'description': 'Comprehensive guide to understanding your legal protections against online harassment, cyberstalking, and image-based abuse.',
                'content': '''# Your Legal Rights

## Overview
Digital violence is illegal in many jurisdictions. You have the right to protection from harassment, stalking, threats, and non-consensual sharing of intimate images.

## Key Protections
- **Anti-Harassment Laws**: Most countries have laws against repeated unwanted contact
- **Cyberstalking Statutes**: Specific laws addressing online stalking and monitoring
- **Revenge Porn Laws**: Many jurisdictions criminalize sharing intimate images without consent
- **Defamation Laws**: Protection against false statements that harm your reputation

## Your Rights
1. Right to report to law enforcement
2. Right to obtain restraining/protection orders
3. Right to sue for damages in civil court
4. Right to request content removal from platforms

## Taking Action
Document all incidents with screenshots, dates, and context. Report to local law enforcement and the platform. Consult with a lawyer specializing in digital harassment.

## Resources
- National Domestic Violence Hotline: 1-800-799-7233
- Cyber Civil Rights Initiative: cybercivilrights.org
- Electronic Frontier Foundation: eff.org
''',
                'category': 'legal_rights',
                'resource_type': 'guide',
                'is_published': True,
                'tags': ['legal', 'rights', 'harassment', 'cyberstalking', 'protection']
            },
            {
                'title': 'Safety Planning for Digital Security',
                'description': 'Step-by-step guide to creating a comprehensive digital safety plan.',
                'content': '''# Digital Safety Planning

## Assess Your Risk
Identify which accounts, devices, or platforms are most vulnerable. Consider who might have access to your information.

## Secure Your Devices
1. Change all passwords immediately
2. Enable two-factor authentication
3. Check device location settings
4. Review app permissions
5. Update software and security patches

## Social Media Audit
- Review privacy settings on all platforms
- Remove location data from photos
- Check who can see your posts and profile
- Consider creating new accounts

## Communication Security
- Use encrypted messaging apps (Signal, WhatsApp)
- Create new email addresses if needed
- Be cautious about sharing new contact information
- Consider using a VPN

## Physical Security
- Secure your devices with strong passwords/biometrics
- Be aware of shoulder surfing in public
- Don't leave devices unattended
- Consider separate devices for sensitive communications

## Emergency Contacts
Keep a list of trusted contacts, support services, and legal resources. Store this information securely offline.

## Regular Reviews
Update your safety plan every 3-6 months or when circumstances change.
''',
                'category': 'safety_planning',
                'resource_type': 'guide',
                'is_published': True,
                'tags': ['safety', 'planning', 'security', 'protection', 'prevention']
            },
            {
                'title': 'Support Organizations Directory',
                'description': 'List of organizations providing support for survivors of digital and gender-based violence.',
                'content': '''# Support Organizations

## International Organizations

### Cyber Civil Rights Initiative (CCRI)
Provides support, resources, and advocacy for victims of non-consensual pornography.
Website: cybercivilrights.org
Email: support@cybercivilrights.org

### Coalition Against Stalkerware
International coalition fighting against stalkerware and providing resources for victims.
Website: stopstalkerware.org

### Women's Aid
Provides support for women and children experiencing domestic abuse, including digital abuse.
Website: womensaid.org.uk
Helpline: 0808 2000 247

## Regional Organizations

### National Network to End Domestic Violence (NNEDV)
US-based organization providing resources and a safety net project focusing on technology.
Website: nnedv.org/safetynet
Email: safetynet@nnedv.org

### Digital Rights Foundation (Pakistan)
Provides support through cyber harassment helpline and legal aid.
Website: digitalrightsfoundation.pk
Helpline: 0800-39393

## Legal Support

### Legal Aid Organizations
Many countries have free legal aid for survivors of violence. Contact your local legal aid society for assistance.

## Tech Support

### Access Now Digital Security Helpline
Free digital security support for at-risk users.
Website: accessnow.org/help
Email: help@accessnow.org
''',
                'category': 'organizations',
                'resource_type': 'directory',
                'is_published': True,
                'tags': ['organizations', 'support', 'helplines', 'advocacy', 'legal aid']
            },
            {
                'title': 'Understanding Technology-Facilitated Abuse Laws',
                'description': 'Overview of legislation addressing digital violence and harassment globally.',
                'content': '''# Technology-Facilitated Abuse Legislation

## Global Overview
More countries are recognizing technology-facilitated abuse and enacting specific legislation.

## Key Legislative Areas

### Non-Consensual Intimate Images
Many jurisdictions now have specific "revenge porn" laws criminalizing:
- Sharing intimate images without consent
- Threatening to share such images (sextortion)
- Creating deepfake pornography

### Cyberstalking and Harassment
Laws typically cover:
- Repeated unwanted contact
- Monitoring or tracking someone's location
- Installing spyware or stalkerware
- Impersonation online

### Coercive Control
Some jurisdictions recognize digital coercive control, including:
- Excessive monitoring
- Isolation through technology
- Financial control through apps
- Restriction of communication

## Reporting Procedures
1. Document all evidence
2. Report to platform/service provider
3. File police report
4. Consider protective orders
5. Consult legal counsel

## Challenges
- Cross-border enforcement
- Platform cooperation
- Evidence preservation
- Privacy vs security balance

## Resources for Legal Information
- Electronic Frontier Foundation: eff.org
- Privacy International: privacyinternational.org
- Local bar associations for referrals
''',
                'category': 'laws',
                'resource_type': 'law',
                'is_published': True,
                'tags': ['legislation', 'laws', 'legal', 'cyberstalking', 'harassment']
            },
            {
                'title': 'Financial Assistance for Survivors',
                'description': 'Guide to accessing financial support and resources for survivors of violence.',
                'content': '''# Financial Assistance Resources

## Emergency Funds
Many organizations offer emergency financial assistance for survivors:

### National Organizations
- **National Domestic Violence Hotline**: Can connect you with local resources
- **Salvation Army**: Emergency financial assistance
- **Catholic Charities**: Various support programs
- **United Way**: 211 service connects to local assistance

## Technology Replacement Programs
Some organizations help replace devices:
- **National Network to End Domestic Violence**: Smartphone replacement program
- **Safe Horizon**: Device assistance in some regions

## Legal Fee Assistance
- Pro bono legal services through bar associations
- Legal aid societies
- Law school clinics
- Victim compensation programs

## Safety Planning Costs
Assistance may be available for:
- Temporary housing/relocation
- Lock changes
- Security systems
- Phone/internet service changes

## Long-term Support
- Workforce development programs
- Educational grants
- Transitional housing programs
- Childcare assistance

## Application Tips
1. Document your situation with police reports or protection orders
2. Contact multiple organizations
3. Ask about eligibility requirements upfront
4. Keep copies of all applications
5. Follow up regularly

## State/Provincial Programs
Check your local government websites for victim compensation programs and emergency assistance.
''',
                'category': 'financial',
                'resource_type': 'guide',
                'is_published': True,
                'tags': ['financial', 'assistance', 'emergency', 'support', 'resources']
            },
            {
                'title': 'Healthcare and Mental Health Resources',
                'description': 'Accessing healthcare support for survivors of digital and gender-based violence.',
                'content': '''# Healthcare Resources for Survivors

## Mental Health Support

### Crisis Hotlines
- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741
- **RAINN**: 1-800-656-4673

### Therapy Options
- Trauma-informed therapists specializing in abuse
- Online therapy platforms (BetterHelp, Talkspace)
- Support groups for survivors
- Free counseling through domestic violence organizations

## Medical Care

### Immediate Needs
If you've experienced physical harm:
1. Seek emergency medical attention
2. Request documentation for legal purposes
3. Ask about sexual assault nurse examiner (SANE) if applicable

### Ongoing Care
- Document any stress-related health issues
- Request referrals to trauma specialists
- Inquire about sliding-scale payment options

## Telehealth Options
Many providers now offer remote appointments:
- Increased privacy and safety
- Easier access from any location
- Often covered by insurance

## Support for Children
If children are affected:
- Pediatric trauma counselors
- School-based support services
- Child advocacy centers

## Self-Care Resources
- Mindfulness and meditation apps
- Online support communities
- Exercise and wellness programs
- Sleep hygiene resources

## Insurance and Payment
- Victim compensation may cover medical expenses
- Medicaid/Medicare options
- Hospital charity care programs
- Community health centers with sliding fees

## Finding Providers
Look for trauma-informed care providers who understand the dynamics of abuse and digital violence.
''',
                'category': 'healthcare',
                'resource_type': 'guide',
                'is_published': True,
                'tags': ['healthcare', 'mental health', 'therapy', 'counseling', 'support']
            }
        ]
        
        for resource_data in resources:
            resource, created = Resource.objects.get_or_create(
                title=resource_data['title'],
                defaults=resource_data
            )
            if created:
                self.stdout.write(f'  ✓ Created resource: {resource.title}')
            else:
                self.stdout.write(f'  ⊘ Resource already exists: {resource.title}')

    def create_helplines(self):
        """Create sample emergency helplines"""
        self.stdout.write('Creating sample helplines...')
        
        helplines = [
            {
                'name': 'National Domestic Violence Hotline',
                'phone_number': '1-800-799-7233',
                'description': '24/7 support for survivors of domestic violence, including technology-facilitated abuse.',
                'category': 'crisis',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English', 'Spanish', '200+ languages via interpreter'],
                'is_active': True,
                'priority': 100
            },
            {
                'name': 'RAINN (Rape, Abuse & Incest National Network)',
                'phone_number': '1-800-656-4673',
                'description': 'National sexual assault hotline providing crisis intervention and support.',
                'category': 'crisis',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English', 'Spanish'],
                'is_active': True,
                'priority': 95
            },
            {
                'name': 'National Suicide Prevention Lifeline',
                'phone_number': '988',
                'description': 'Free, confidential support for people in distress and crisis prevention.',
                'category': 'crisis',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English', 'Spanish'],
                'is_active': True,
                'priority': 90
            },
            {
                'name': 'Crisis Text Line',
                'phone_number': 'Text HOME to 741741',
                'description': 'Text-based crisis support. Text HOME to 741741 to connect with a crisis counselor.',
                'category': 'crisis',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English', 'Spanish'],
                'is_active': True,
                'priority': 85
            },
            {
                'name': 'National Center for Victims of Crime',
                'phone_number': '1-855-484-2846',
                'description': 'Support and resources for crime victims, including referrals to local services.',
                'category': 'legal',
                'availability': 'Monday-Friday, 9am-5pm EST',
                'is_24_7': False,
                'languages': ['English'],
                'is_active': True,
                'priority': 75
            },
            {
                'name': 'Cyber Civil Rights Initiative Helpline',
                'phone_number': 'Visit cybercivilrights.org',
                'description': 'Support for victims of non-consensual pornography and online harassment.',
                'category': 'legal',
                'availability': 'Online form available 24/7, response within 48 hours',
                'is_24_7': False,
                'languages': ['English'],
                'is_active': True,
                'priority': 80
            },
            {
                'name': 'SAMHSA National Helpline',
                'phone_number': '1-800-662-4357',
                'description': 'Substance Abuse and Mental Health Services Administration helpline providing treatment referrals.',
                'category': 'counseling',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English', 'Spanish'],
                'is_active': True,
                'priority': 70
            },
            {
                'name': 'National Alliance on Mental Illness (NAMI)',
                'phone_number': '1-800-950-6264',
                'description': 'Mental health support, information, and referrals.',
                'category': 'counseling',
                'availability': 'Monday-Friday, 10am-10pm EST',
                'is_24_7': False,
                'languages': ['English'],
                'is_active': True,
                'priority': 65
            },
            {
                'name': 'National Safe Place',
                'phone_number': 'Text SAFE and current location to 69866',
                'description': 'Immediate help and safety for youth in crisis situations.',
                'category': 'shelter',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English'],
                'is_active': True,
                'priority': 72
            },
            {
                'name': 'National Human Trafficking Hotline',
                'phone_number': '1-888-373-7888',
                'description': 'Support and resources for trafficking victims and those seeking help.',
                'category': 'crisis',
                'availability': '24/7',
                'is_24_7': True,
                'languages': ['English', 'Spanish', '200+ languages via interpreter'],
                'is_active': True,
                'priority': 88
            }
        ]
        
        for helpline_data in helplines:
            helpline, created = Helpline.objects.get_or_create(
                name=helpline_data['name'],
                defaults=helpline_data
            )
            if created:
                self.stdout.write(f'  ✓ Created helpline: {helpline.name}')
            else:
                self.stdout.write(f'  ⊘ Helpline already exists: {helpline.name}')
