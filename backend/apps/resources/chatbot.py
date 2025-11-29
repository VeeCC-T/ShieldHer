"""
Enhanced chatbot with improved pattern matching and contextual responses.
Provides automated responses to common questions with better empathy and resource connection.
"""

import re
from typing import Dict, List, Optional


class EnhancedChatbot:
    """
    Improved pattern-matching chatbot for emergency support.
    
    Features:
    - More empathetic responses
    - Better resource connections
    - Context-aware follow-ups
    - Multi-keyword matching
    """
    
    # Enhanced response patterns with better empathy
    RESPONSES = {
        'immediate_danger': {
            'keywords': ['danger', 'hurt me', 'hurting me', 'scared right now', 'help now', 'urgent', 'emergency now'],
            'response': "Your safety is the top priority. If you are in immediate danger:\n\n🚨 Call 911 immediately\n📞 National Domestic Violence Hotline: 1-800-799-7233 (24/7)\n💬 Text 'START' to 88788 for text support\n\nThese services are confidential and available right now to help you get to safety.",
            'follow_up': "Would you like information about creating a safety plan or finding emergency shelter?"
        },
        'crisis': {
            'keywords': ['crisis', 'can\'t take it', 'overwhelmed', 'breaking point', 'giving up'],
            'response': "I hear that you're going through an incredibly difficult time. You don't have to face this alone.\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n💬 Crisis Text Line: Text HOME to 741741\n🌐 Online chat available at thehotline.org\n\nTrained advocates are available 24/7 to listen and help you through this.",
            'follow_up': "Would you like to talk about safety planning or mental health resources?"
        },
        'legal': {
            'keywords': ['legal', 'lawyer', 'attorney', 'court', 'restraining order', 'protection order', 'rights', 'sue', 'charges'],
            'response': "Understanding your legal rights is an important step.\n\n✓ You have the right to seek legal protection\n✓ Restraining/protection orders can be obtained\n✓ Free legal aid may be available\n\n📞 National Domestic Violence Hotline (1-800-799-7233) can connect you with:\n   • Local legal aid organizations\n   • Pro bono attorneys\n   • Court advocates\n\n📚 Check our Resources page for detailed legal information",
            'follow_up': "Would you like help finding a local legal aid organization?"
        },
        'shelter': {
            'keywords': ['shelter', 'housing', 'place to stay', 'safe place', 'escape', 'leave', 'run away', 'need to go'],
            'response': "Finding a safe place is crucial. Help is available:\n\n🏠 Emergency shelters provide:\n   • Safe, confidential housing\n   • Meals and basic necessities\n   • Support services\n   • Help finding permanent housing\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n   They can help you find local shelter with immediate availability\n\n🌐 National Safe Place: Text SAFE + your location to 69866",
            'follow_up': "Would you like information about what to bring when leaving or safety planning?"
        },
        'counseling': {
            'keywords': ['counseling', 'therapy', 'therapist', 'mental health', 'talk to someone', 'support group', 'depression', 'anxiety', 'ptsd'],
            'response': "Taking care of your mental health is so important. Support is available:\n\n💜 Mental Health Resources:\n   • RAINN: 1-800-656-HOPE (4673)\n   • NAMI Helpline: 1-800-950-6264\n   • Crisis Text Line: Text HOME to 741741\n\n🤝 Support Groups:\n   • Local survivor support groups\n   • Online support communities\n   • Peer counseling\n\n📚 Our Resources page has information about:\n   • Finding trauma-informed therapists\n   • Sliding-scale counseling\n   • Online therapy options",
            'follow_up': "Would you like to explore self-care resources or learn about different types of therapy?"
        },
        'financial': {
            'keywords': ['money', 'financial', 'funds', 'assistance', 'bills', 'rent', 'food', 'can\'t afford', 'broke', 'poor'],
            'response': "Financial concerns are valid and help is available:\n\n💰 Financial Assistance:\n   • Emergency funds for survivors\n   • Help with housing costs\n   • Food assistance programs\n   • Utility bill assistance\n   • Job training programs\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n   They can connect you with local financial assistance programs\n\n📚 Visit our Resources page for:\n   • Emergency fund applications\n   • Workforce development programs\n   • Financial planning for survivors",
            'follow_up': "Would you like information about employment resources or emergency financial assistance?"
        },
        'children': {
            'keywords': ['children', 'kids', 'child', 'son', 'daughter', 'baby', 'protect my child', 'children safe'],
            'response': "Protecting your children is a priority. Resources are available:\n\n👶 Child Safety Resources:\n   • Childhelp National Hotline: 1-800-422-4453\n   • Child advocacy centers\n   • Counseling for children\n   • Legal protection for children\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n   Advocates can help with:\n   • Safety planning for children\n   • Custody concerns\n   • Child support resources\n\n📚 Our Resources page includes:\n   • Helping children cope\n   • Resources for parents\n   • Educational support",
            'follow_up': "Would you like information about child custody rights or counseling for children?"
        },
        'safety_planning': {
            'keywords': ['safety plan', 'plan to leave', 'prepare', 'get ready', 'what to bring', 'how to leave'],
            'response': "Creating a safety plan is a smart and important step:\n\n📋 Safety Planning Includes:\n   • Identifying safe places to go\n   • Gathering important documents\n   • Setting aside emergency money\n   • Preparing a bag with essentials\n   • Creating a communication plan\n   • Protecting your digital privacy\n\n📚 Visit our Resources page for:\n   • Detailed safety planning guide\n   • Document checklist\n   • Digital safety tips\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n   Advocates can help create a personalized safety plan",
            'follow_up': "Would you like to learn about digital safety or what documents to gather?"
        },
        'police': {
            'keywords': ['police', 'report', 'file report', 'law enforcement', 'press charges', 'call cops'],
            'response': "Reporting to law enforcement is a personal decision. Here's what you should know:\n\n👮 Reporting Options:\n   • Call 911 in an emergency\n   • File a report at local police station\n   • Request a specific officer (ask for DV-trained)\n   • Bring evidence if possible (photos, messages, etc.)\n\n✓ You have the right to:\n   • File a report\n   • Request a protection order\n   • Have an advocate present\n   • Receive a copy of the report\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n   Advocates can:\n   • Explain the reporting process\n   • Discuss what to expect\n   • Connect you with legal advocates",
            'follow_up': "Would you like information about protection orders or what happens after filing a report?"
        },
        'technology_abuse': {
            'keywords': ['tracking', 'monitoring', 'spyware', 'phone', 'computer', 'stalkerware', 'hacked', 'accessing my'],
            'response': "Technology abuse is a serious violation of your privacy:\n\n📱 Digital Safety Steps:\n   • Check for stalkerware/spyware apps\n   • Change all passwords on a safe device\n   • Enable two-factor authentication\n   • Review app permissions\n   • Check location sharing settings\n\n🔒 Resources:\n   • Coalition Against Stalkerware: stopstalkerware.org\n   • Digital Defense Fund guides\n   • NNEDV Safety Net: nnedv.org/safetynet\n\n📞 National Domestic Violence Hotline: 1-800-799-7233\n   For personalized tech safety planning\n\n📚 Visit our Digital Literacy section for:\n   • Detecting spyware\n   • Securing your devices\n   • Privacy settings guides",
            'follow_up': "Would you like step-by-step instructions for checking your device for spyware?"
        },
        'emotional_support': {
            'keywords': ['alone', 'isolated', 'no one believes', 'ashamed', 'guilty', 'my fault', 'deserve'],
            'response': "What you're experiencing is not your fault, and you deserve support:\n\n💜 Please know:\n   • You are not alone\n   • This is not your fault\n   • You deserve to be safe and respected\n   • Your feelings are valid\n   • Help is available\n\n📞 Talk to Someone:\n   • National Domestic Violence Hotline: 1-800-799-7233\n   • Crisis Text Line: Text HOME to 741741\n   • Trained advocates who understand\n\n🤝 Support Communities:\n   • Survivor support groups\n   • Online communities\n   • Peer support programs\n\nYou've taken a brave step by seeking information. That shows strength.",
            'follow_up': "Would you like to explore counseling resources or connect with support groups?"
        },
        'leaving': {
            'keywords': ['should i leave', 'thinking of leaving', 'want to leave', 'ready to leave', 'how to leave'],
            'response': "Deciding to leave is a deeply personal choice and should be made when it's safe for you:\n\n🤔 Important Considerations:\n   • Your safety and the safety of any children\n   • Creating a safety plan first\n   • Gathering important documents\n   • Financial planning\n   • Having a safe place to go\n\n📞 Get Personalized Guidance:\n   National Domestic Violence Hotline: 1-800-799-7233\n   • Discuss your specific situation\n   • Create a safety plan\n   • Explore all options\n\n⚠️ Important: The most dangerous time can be when leaving or shortly after\n   Professional advocates can help you leave safely\n\n📚 Resources page has:\n   • Detailed leaving guide\n   • Safety planning checklist\n   • Emergency shelter information",
            'follow_up': "Would you like to create a safety plan or learn about emergency shelter options?"
        },
        'digital_evidence': {
            'keywords': ['evidence', 'screenshot', 'document', 'save messages', 'proof', 'record'],
            'response': "Documenting abuse is important for legal and protective purposes:\n\n📸 How to Document:\n   • Screenshot threatening messages/posts\n   • Save emails and voicemails\n   • Note dates, times, and details of incidents\n   • Photograph injuries (include date)\n   • Keep records of expenses related to abuse\n   • Save to a cloud account they can't access\n\n✓ Important Tips:\n   • Use a device they don't have access to\n   • Store copies in multiple safe places\n   • Don't delete original messages\n   • Include context (dates, times, usernames)\n\n🔒 Safety Note:\n   Clear your browsing history if necessary\n   Use private/incognito mode\n\n📞 Legal guidance available:\n   National Center for Victims of Crime: 1-855-484-2846",
            'follow_up': "Would you like information about protection orders or finding legal assistance?"
        },
        'work_school': {
            'keywords': ['work', 'job', 'boss', 'school', 'college', 'employer', 'missing work', 'grades'],
            'response': "Abuse can impact work and school. You have rights and resources:\n\n💼 Work Rights:\n   • FMLA leave may be available\n   • Some states have domestic violence leave laws\n   • EAP (Employee Assistance Programs)\n   • HR can help with safety planning\n\n🎓 School Resources:\n   • Title IX protections\n   • Campus counseling services\n   • Academic accommodations\n   • Campus police/security\n\n📞 For specific guidance:\n   National Domestic Violence Hotline: 1-800-799-7233\n   Legal Aid organizations\n\n📚 Resources about:\n   • Workplace protections\n   • Explaining absences\n   • Safety planning at work/school",
            'follow_up': "Would you like information about workplace rights or academic accommodations?"
        },
        'greeting': {
            'keywords': ['hello', 'hi', 'hey', 'greetings', 'help'],
            'response': "Hello, and welcome to a safe space. I'm here to help you find resources and support.\n\n💜 You can ask me about:\n   • Emergency help and crisis support\n   • Legal rights and protection orders\n   • Emergency shelters and housing\n   • Counseling and mental health\n   • Financial assistance\n   • Safety planning\n   • Technology safety\n   • And more...\n\n🔒 Remember: This conversation is private, but always use a safe device.\n\nHow can I help you today?",
            'follow_up': None
        },
        'thanks': {
            'keywords': ['thank', 'thanks', 'appreciate', 'helpful'],
            'response': "You're very welcome. Remember:\n\n💜 You are not alone\n💪 Seeking information shows strength\n🆘 Help is always available\n\n📞 24/7 Support:\n   • National Domestic Violence Hotline: 1-800-799-7233\n   • Crisis Text Line: Text HOME to 741741\n\nIs there anything else I can help you with?",
            'follow_up': None
        },
    }
    
    DEFAULT_RESPONSE = (
        "I'm here to help with information about:\n\n"
        "🆘 **Emergency Support**\n"
        "   • Crisis help and immediate danger\n"
        "   • Emergency shelters and housing\n\n"
        "⚖️ **Legal Information**\n"
        "   • Legal rights and protection orders\n"
        "   • Finding legal aid\n\n"
        "💚 **Support Services**\n"
        "   • Counseling and mental health\n"
        "   • Support groups\n\n"
        "💰 **Practical Help**\n"
        "   • Financial assistance\n"
        "   • Safety planning\n\n"
        "📱 **Digital Safety**\n"
        "   • Technology abuse\n"
        "   • Privacy protection\n\n"
        "For immediate help, call the National Domestic Violence Hotline at 1-800-799-7233 (24/7).\n\n"
        "What would you like to know more about?"
    )
    
    @classmethod
    def get_response(cls, message: str, conversation_history: Optional[List[Dict]] = None) -> Dict[str, str]:
        """
        Get enhanced chatbot response with context awareness.
        
        Args:
            message: User's message
            conversation_history: Previous messages for context
        
        Returns:
            dict: Response with message, category, and optional follow-up
        """
        if not message or not message.strip():
            return {
                'response': cls.DEFAULT_RESPONSE,
                'category': 'default',
                'follow_up': None
            }
        
        # Normalize message
        message_lower = message.lower().strip()
        
        # Check each pattern (ordered by priority - immediate danger first)
        priority_order = [
            'immediate_danger', 'crisis', 'leaving', 'shelter',
            'technology_abuse', 'children', 'safety_planning',
            'legal', 'police', 'digital_evidence',
            'counseling', 'emotional_support', 'financial',
            'work_school', 'greeting', 'thanks'
        ]
        
        for category in priority_order:
            if category not in cls.RESPONSES:
                continue
                
            pattern_data = cls.RESPONSES[category]
            keywords = pattern_data['keywords']
            
            # Check if any keyword matches
            for keyword in keywords:
                if keyword in message_lower:
                    return {
                        'response': pattern_data['response'],
                        'category': category,
                        'follow_up': pattern_data.get('follow_up')
                    }
        
        # No match found, return default
        return {
            'response': cls.DEFAULT_RESPONSE,
            'category': 'default',
            'follow_up': None
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
            "How do I find emergency shelter?",
            "What are my legal rights?",
            "I think my phone is being monitored",
            "How do I create a safety plan?",
            "Where can I find counseling?",
            "I need financial assistance",
            "How do I protect my children?",
            "Should I file a police report?",
            "I'm thinking about leaving",
        ]
    
    @classmethod
    def get_quick_resources(cls) -> List[Dict[str, str]]:
        """
        Get quick access emergency resources.
        
        Returns:
            list: Emergency contact information
        """
        return [
            {
                'name': 'National Domestic Violence Hotline',
                'contact': '1-800-799-7233',
                'description': '24/7 support, all situations',
                'type': 'phone'
            },
            {
                'name': 'Crisis Text Line',
                'contact': 'Text HOME to 741741',
                'description': 'Text-based crisis support',
                'type': 'text'
            },
            {
                'name': 'Emergency Services',
                'contact': '911',
                'description': 'Immediate danger',
                'type': 'emergency'
            },
            {
                'name': 'RAINN',
                'contact': '1-800-656-4673',
                'description': 'Sexual assault support',
                'type': 'phone'
            },
        ]


# Convenience function for easy import
def get_chatbot_response(message: str, conversation_history: Optional[List[Dict]] = None) -> Dict[str, str]:
    """
    Get enhanced chatbot response for a message.
    
    Args:
        message: User's message
        conversation_history: Previous messages for context
    
    Returns:
        dict: Response with message, category, and follow-up
    """
    return EnhancedChatbot.get_response(message, conversation_history)
