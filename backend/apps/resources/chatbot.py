"""
Mock chatbot with pattern matching.
Provides automated responses to common questions.
In production, this would integrate with an AI service.
"""

import re
from typing import Dict, List


class MockChatbot:
    """
    Simple pattern-matching chatbot for emergency support.
    
    This is a mock implementation for development. In production, replace with:
    - OpenAI API integration
    - Dialogflow integration
    - Or other conversational AI service
    """
    
    # Response patterns
    RESPONSES = {
        'crisis': {
            'keywords': ['crisis', 'emergency', 'danger', 'help now', 'urgent', 'scared', 'afraid'],
            'response': "If you're in immediate danger, please call 911 or the National Domestic Violence Hotline at 1-800-799-7233 (24/7). They can help you right now."
        },
        'legal': {
            'keywords': ['legal', 'lawyer', 'attorney', 'court', 'restraining order', 'protection order', 'rights'],
            'response': "For legal assistance, please check our Resources page for legal aid organizations in your area. You can also call the National Domestic Violence Hotline at 1-800-799-7233 for legal referrals."
        },
        'shelter': {
            'keywords': ['shelter', 'housing', 'place to stay', 'safe place', 'escape', 'leave'],
            'response': "For emergency shelter information, please call the National Domestic Violence Hotline at 1-800-799-7233. They can help you find safe housing options in your area."
        },
        'counseling': {
            'keywords': ['counseling', 'therapy', 'therapist', 'mental health', 'talk to someone', 'support group'],
            'response': "Mental health support is important. You can find counseling resources on our Resources page, or call the National Domestic Violence Hotline at 1-800-799-7233 for referrals to local counselors."
        },
        'financial': {
            'keywords': ['money', 'financial', 'funds', 'assistance', 'bills', 'rent'],
            'response': "Financial assistance may be available through local organizations. Check our Resources page for financial aid information, or call 1-800-799-7233 for referrals."
        },
        'safety': {
            'keywords': ['safety plan', 'safe', 'protect', 'security', 'privacy'],
            'response': "Creating a safety plan is important. Visit our Resources page for safety planning guides, or call the National Domestic Violence Hotline at 1-800-799-7233 to create a personalized safety plan."
        },
        'children': {
            'keywords': ['children', 'kids', 'child', 'son', 'daughter'],
            'response': "Protecting children is a priority. The National Domestic Violence Hotline (1-800-799-7233) can provide guidance on keeping children safe and accessing resources for families."
        },
        'police': {
            'keywords': ['police', 'report', 'file report', 'law enforcement'],
            'response': "If you want to report abuse, you can call your local police department or 911 in an emergency. The National Domestic Violence Hotline (1-800-799-7233) can also guide you through the reporting process."
        },
        'greeting': {
            'keywords': ['hello', 'hi', 'hey', 'greetings'],
            'response': "Hello! I'm here to help you find resources and support. You can ask me about crisis support, legal help, shelters, counseling, or other resources. How can I assist you today?"
        },
        'thanks': {
            'keywords': ['thank', 'thanks', 'appreciate'],
            'response': "You're welcome. Remember, you're not alone. If you need immediate help, call the National Domestic Violence Hotline at 1-800-799-7233 (24/7)."
        }
    }
    
    DEFAULT_RESPONSE = (
        "I'm here to help. You can ask me about:\n"
        "• Crisis support and emergency help\n"
        "• Legal assistance and rights\n"
        "• Emergency shelters\n"
        "• Counseling and mental health\n"
        "• Financial assistance\n"
        "• Safety planning\n\n"
        "For immediate help, call the National Domestic Violence Hotline at 1-800-799-7233 (24/7)."
    )
    
    @classmethod
    def get_response(cls, message: str) -> Dict[str, str]:
        """
        Get chatbot response based on message content.
        
        Args:
            message: User's message
        
        Returns:
            dict: Response with message and matched category
        """
        if not message or not message.strip():
            return {
                'response': cls.DEFAULT_RESPONSE,
                'category': 'default'
            }
        
        # Normalize message
        message_lower = message.lower().strip()
        
        # Check each pattern
        for category, pattern_data in cls.RESPONSES.items():
            keywords = pattern_data['keywords']
            
            # Check if any keyword matches
            for keyword in keywords:
                if keyword in message_lower:
                    return {
                        'response': pattern_data['response'],
                        'category': category
                    }
        
        # No match found, return default
        return {
            'response': cls.DEFAULT_RESPONSE,
            'category': 'default'
        }
    
    @classmethod
    def get_suggested_questions(cls) -> List[str]:
        """
        Get list of suggested questions for users.
        
        Returns:
            list: Suggested questions
        """
        return [
            "I need help right now",
            "How do I find a lawyer?",
            "Where can I find emergency shelter?",
            "I need counseling support",
            "How do I create a safety plan?",
            "What are my legal rights?"
        ]


# Convenience function for easy import
def get_chatbot_response(message: str) -> Dict[str, str]:
    """
    Get chatbot response for a message.
    
    Args:
        message: User's message
    
    Returns:
        dict: Response with message and category
    """
    return MockChatbot.get_response(message)
