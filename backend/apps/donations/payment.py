"""
Mock payment processing utility.
Simulates payment gateway for development and testing.
In production, this would integrate with Stripe, PayPal, etc.
"""

import time
import random
from decimal import Decimal


class MockPaymentProcessor:
    """
    Mock payment processor that simulates payment gateway behavior.
    
    This is a simple mock for development. In production, replace with:
    - Stripe API integration
    - PayPal API integration
    - Or other payment gateway
    """
    
    @staticmethod
    def generate_payment_intent_id():
        """
        Generate a mock payment intent ID.
        Format: pi_mock_{timestamp}_{random}
        """
        timestamp = int(time.time())
        random_suffix = random.randint(1000, 9999)
        return f"pi_mock_{timestamp}_{random_suffix}"
    
    @staticmethod
    def process_payment(amount, currency='USD', payment_method=None):
        """
        Process a mock payment.
        
        Args:
            amount (Decimal): Payment amount
            currency (str): Currency code (default: USD)
            payment_method (dict): Payment method details (not used in mock)
        
        Returns:
            dict: Payment result with success status and payment_intent_id
        """
        # Validate amount
        if not isinstance(amount, (Decimal, float, int)):
            return {
                'success': False,
                'error': 'Invalid amount type',
                'payment_intent_id': None
            }
        
        amount = Decimal(str(amount))
        
        if amount <= 0:
            return {
                'success': False,
                'error': 'Amount must be greater than zero',
                'payment_intent_id': None
            }
        
        if amount > 100000:
            return {
                'success': False,
                'error': 'Amount exceeds maximum limit',
                'payment_intent_id': None
            }
        
        # Simulate payment processing delay
        time.sleep(0.1)
        
        # Generate payment intent ID
        payment_intent_id = MockPaymentProcessor.generate_payment_intent_id()
        
        # Simulate 95% success rate (5% random failures for testing)
        success = random.random() > 0.05
        
        if success:
            return {
                'success': True,
                'payment_intent_id': payment_intent_id,
                'status': 'completed',
                'amount': float(amount),
                'currency': currency
            }
        else:
            return {
                'success': False,
                'error': 'Payment declined by processor',
                'payment_intent_id': payment_intent_id,
                'status': 'failed'
            }
    
    @staticmethod
    def refund_payment(payment_intent_id, amount=None):
        """
        Process a mock refund.
        
        Args:
            payment_intent_id (str): Original payment intent ID
            amount (Decimal, optional): Refund amount (None for full refund)
        
        Returns:
            dict: Refund result
        """
        # Validate payment intent ID
        if not payment_intent_id or not payment_intent_id.startswith('pi_mock_'):
            return {
                'success': False,
                'error': 'Invalid payment intent ID'
            }
        
        # Simulate refund processing
        time.sleep(0.1)
        
        return {
            'success': True,
            'refund_id': f"re_mock_{int(time.time())}",
            'status': 'refunded',
            'payment_intent_id': payment_intent_id
        }
    
    @staticmethod
    def get_payment_status(payment_intent_id):
        """
        Get mock payment status.
        
        Args:
            payment_intent_id (str): Payment intent ID
        
        Returns:
            dict: Payment status
        """
        if not payment_intent_id or not payment_intent_id.startswith('pi_mock_'):
            return {
                'success': False,
                'error': 'Invalid payment intent ID'
            }
        
        # Mock: assume all valid IDs are completed
        return {
            'success': True,
            'payment_intent_id': payment_intent_id,
            'status': 'completed'
        }


# Convenience function for easy import
def process_payment(amount, currency='USD', payment_method=None):
    """
    Process a payment using the mock payment processor.
    
    Args:
        amount: Payment amount
        currency: Currency code
        payment_method: Payment method details
    
    Returns:
        dict: Payment result
    """
    return MockPaymentProcessor.process_payment(amount, currency, payment_method)
