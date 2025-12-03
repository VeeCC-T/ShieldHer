/**
 * Custom hook for lessons API
 * Handles fetching lessons, lesson details, and quiz submission
 */

import { useState, useEffect } from 'react';

// Comprehensive mock data for demo
const MOCK_LESSONS = [
  {
    id: 1,
    title: 'Protecting Your Digital Privacy',
    description: 'Learn how to safeguard your personal information online and understand privacy settings across platforms.',
    category: 'privacy',
    difficulty: 'beginner',
    duration_minutes: 15,
    thumbnail_url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=250&fit=crop',
    content: `
      <h2>Understanding Digital Privacy</h2>
      <p>Your digital privacy is your right to control what information you share online and who can access it. In today's connected world, protecting your privacy is more important than ever.</p>
      
      <h3>Why Privacy Matters</h3>
      <ul>
        <li>Protects you from identity theft and fraud</li>
        <li>Prevents unwanted surveillance and tracking</li>
        <li>Gives you control over your personal narrative</li>
        <li>Safeguards sensitive information from abusers</li>
      </ul>
      
      <h3>Key Privacy Principles</h3>
      <p><strong>1. Minimize Data Sharing</strong><br/>Only share information that is absolutely necessary. Review app permissions regularly.</p>
      
      <p><strong>2. Use Strong Privacy Settings</strong><br/>Adjust your social media privacy settings to limit who can see your posts and personal information.</p>
      
      <p><strong>3. Be Aware of Tracking</strong><br/>Websites and apps track your behavior. Use privacy-focused browsers and consider browser extensions that block trackers.</p>
      
      <h3>Practical Steps</h3>
      <ol>
        <li>Review privacy settings on all social media accounts</li>
        <li>Use a privacy-focused search engine like DuckDuckGo</li>
        <li>Enable two-factor authentication everywhere possible</li>
        <li>Regularly check what data companies have about you</li>
        <li>Use a VPN when on public WiFi</li>
      </ol>
    `,
    quiz: [
      {
        id: 1,
        question: 'What is the most important reason to protect your digital privacy?',
        options: [
          'To hide illegal activities',
          'To control what information others can access about you',
          'To avoid spam emails',
          'To save storage space'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which of these is a good privacy practice?',
        options: [
          'Accepting all app permissions',
          'Using the same password everywhere',
          'Enabling two-factor authentication',
          'Making all social media posts public'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'When should you use a VPN?',
        options: [
          'Only when doing online banking',
          'Never, they are unnecessary',
          'When using public WiFi networks',
          'Only on weekends'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    title: 'Recognizing Online Harassment',
    description: 'Identify different forms of digital abuse and learn how to document and report harassment safely.',
    category: 'safety',
    difficulty: 'beginner',
    duration_minutes: 20,
    thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    content: `
      <h2>Understanding Online Harassment</h2>
      <p>Online harassment includes any behavior intended to harm, intimidate, or control someone through digital means. It's important to recognize these patterns early.</p>
      
      <h3>Types of Online Harassment</h3>
      <p><strong>Cyberstalking</strong><br/>Repeated unwanted contact, monitoring online activities, or using technology to track someone's location.</p>
      
      <p><strong>Doxxing</strong><br/>Publishing private information (address, phone number, workplace) without consent.</p>
      
      <p><strong>Image-Based Abuse</strong><br/>Sharing intimate images without consent or threatening to do so.</p>
      
      <p><strong>Impersonation</strong><br/>Creating fake accounts pretending to be you or using your identity to harm your reputation.</p>
      
      <p><strong>Trolling and Abuse</strong><br/>Sending threatening, abusive, or hateful messages repeatedly.</p>
      
      <h3>Warning Signs</h3>
      <ul>
        <li>Receiving unwanted messages after blocking someone</li>
        <li>Someone knows details about your life they shouldn't</li>
        <li>Fake accounts appearing with your photos or information</li>
        <li>Friends receiving strange messages claiming to be from you</li>
        <li>Being tagged in inappropriate or harmful posts</li>
      </ul>
      
      <h3>How to Respond</h3>
      <ol>
        <li><strong>Document Everything</strong> - Screenshot messages, save URLs, note dates and times</li>
        <li><strong>Don't Engage</strong> - Responding can escalate the situation</li>
        <li><strong>Block and Report</strong> - Use platform reporting tools</li>
        <li><strong>Tell Someone</strong> - Don't deal with this alone</li>
        <li><strong>Consider Legal Action</strong> - Some harassment is criminal</li>
      </ol>
    `,
    quiz: [
      {
        id: 1,
        question: 'What is doxxing?',
        options: [
          'Sending too many messages',
          'Publishing someone\'s private information without consent',
          'Creating a fake profile',
          'Hacking into accounts'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'If you experience online harassment, you should:',
        options: [
          'Respond aggressively to scare them off',
          'Delete all your social media accounts',
          'Document everything and report it',
          'Ignore it and hope it stops'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'Why is it important to document online harassment?',
        options: [
          'To post evidence on social media',
          'To provide evidence for reports or legal action',
          'To create a viral post',
          'It\'s not important'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: 'Secure Password Management',
    description: 'Create strong passwords and learn safe password management techniques to protect all your accounts.',
    category: 'security',
    difficulty: 'beginner',
    duration_minutes: 12,
    thumbnail_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop',
    content: `
      <h2>Password Security Fundamentals</h2>
      <p>Your passwords are the keys to your digital life. Weak passwords are one of the easiest ways for attackers to gain access to your accounts.</p>
      
      <h3>What Makes a Strong Password?</h3>
      <ul>
        <li><strong>Length:</strong> At least 12-16 characters</li>
        <li><strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and symbols</li>
        <li><strong>Uniqueness:</strong> Different password for every account</li>
        <li><strong>Unpredictability:</strong> Avoid personal information, common words, or patterns</li>
      </ul>
      
      <h3>Common Password Mistakes</h3>
      <p>&#10060; Using "password123" or "qwerty"<br/>
      &#10060; Using birthdates, names, or pet names<br/>
      &#10060; Reusing the same password across multiple sites<br/>
      &#10060; Sharing passwords with others<br/>
      &#10060; Writing passwords on sticky notes</p>
      
      <h3>Creating Strong Passwords</h3>
      <p><strong>Method 1: Passphrase</strong><br/>
      Use a memorable phrase: "MyDog!Loves2Eat@Treats" (22 characters, easy to remember)</p>
      
      <p><strong>Method 2: Password Manager Generated</strong><br/>
      Let a password manager create random passwords: "x7#mK9$pL2@vN4&q" (impossible to guess)</p>
      
      <h3>Password Managers</h3>
      <p>A password manager securely stores all your passwords so you only need to remember one master password.</p>
      
      <p><strong>Benefits:</strong></p>
      <ul>
        <li>Generates strong, unique passwords for each site</li>
        <li>Automatically fills in passwords</li>
        <li>Encrypted storage</li>
        <li>Works across all your devices</li>
      </ul>
      
      <p><strong>Recommended:</strong> Bitwarden (free), 1Password, LastPass, Dashlane</p>
      
      <h3>Two-Factor Authentication (2FA)</h3>
      <p>Even with a strong password, enable 2FA wherever possible. This adds a second verification step (usually a code sent to your phone) making it much harder for someone to access your account.</p>
    `,
    quiz: [
      {
        id: 1,
        question: 'What is the minimum recommended password length?',
        options: [
          '6 characters',
          '8 characters',
          '12 characters',
          '20 characters'
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'Which is the strongest password?',
        options: [
          'JohnSmith1990',
          'password123',
          'Purple$Elephant7*Dancing',
          'qwerty'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is two-factor authentication (2FA)?',
        options: [
          'Using two passwords',
          'A second verification step beyond your password',
          'Changing your password twice a year',
          'Having two email accounts'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 4,
    title: 'Social Media Safety Tips',
    description: 'Navigate social media safely with privacy controls, safe sharing practices, and boundary setting.',
    category: 'awareness',
    difficulty: 'intermediate',
    duration_minutes: 18,
    thumbnail_url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop',
    content: `
      <h2>Staying Safe on Social Media</h2>
      <p>Social media can be a great way to connect, but it also comes with risks. Learn how to enjoy social platforms while protecting yourself.</p>
      
      <h3>Privacy Settings Checklist</h3>
      <p><strong>Profile Visibility</strong></p>
      <ul>
        <li>Set profile to private/friends-only when possible</li>
        <li>Review who can see your posts, photos, and personal information</li>
        <li>Limit who can tag you in posts</li>
        <li>Turn off location services for social apps</li>
      </ul>
      
      <p><strong>Contact Information</strong></p>
      <ul>
        <li>Don't list your phone number or address publicly</li>
        <li>Hide email from public view</li>
        <li>Be careful about listing your workplace or school</li>
      </ul>
      
      <h3>What NOT to Share</h3>
      <p>&#10060; Real-time location ("At the airport!", "Home alone tonight")<br/>
      &#10060; Vacation plans before or during your trip<br/>
      &#10060; Photos showing your address, license plate, or ID cards<br/>
      &#10060; Financial information or pictures of credit cards<br/>
      &#10060; Children's full names, schools, or schedules<br/>
      &#10060; Daily routines that reveal patterns</p>
      
      <h3>Recognizing Red Flags</h3>
      <p><strong>Fake Profiles:</strong></p>
      <ul>
        <li>New account with few followers/friends</li>
        <li>Profile photo looks like a stock image</li>
        <li>Minimal personal information</li>
        <li>Sends friend request but has no mutual connections</li>
      </ul>
      
      <h3>Handling Unwanted Contact</h3>
      <ol>
        <li><strong>Block immediately</strong> - Don't explain or engage</li>
        <li><strong>Screenshot messages</strong> - Before blocking, save evidence</li>
        <li><strong>Report to platform</strong> - Use built-in reporting tools</li>
        <li><strong>Tell someone</strong> - Don't handle threatening behavior alone</li>
        <li><strong>Adjust privacy settings</strong> - Limit who can contact you</li>
      </ol>
      
      <h3>Platform-Specific Tips</h3>
      <p><strong>Facebook:</strong> Use "View As" to see what others see on your profile</p>
      <p><strong>Instagram:</strong> Make account private, turn off activity status</p>
      <p><strong>Twitter/X:</strong> Protect your tweets, filter who can message you</p>
      <p><strong>TikTok:</strong> Set to private, disable duets/stitches from strangers</p>
    `,
    quiz: [
      {
        id: 1,
        question: 'Why should you avoid posting real-time location updates?',
        options: [
          'It uses too much data',
          'It reveals when you\'re not home or where you are',
          'It\'s against social media rules',
          'It doesn\'t matter'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What\'s a red flag for a fake social media profile?',
        options: [
          'They have a lot of followers',
          'They post frequently',
          'New account with no mutual friends',
          'They use emojis'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'If someone is harassing you on social media, you should:',
        options: [
          'Argue with them publicly',
          'Block, screenshot, and report',
          'Delete your account',
          'Respond with threats'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 5,
    title: 'Detecting Phishing & Scams',
    description: 'Learn to identify fraudulent emails, messages, and websites designed to steal your information.',
    category: 'security',
    difficulty: 'intermediate',
    duration_minutes: 16,
    thumbnail_url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop',
    content: `
      <h2>Understanding Phishing Attacks</h2>
      <p>Phishing is when criminals impersonate legitimate organizations to trick you into revealing sensitive information like passwords, credit card numbers, or personal data.</p>
      
      <h3>Common Phishing Tactics</h3>
      
      <p><strong>1. Urgency and Fear</strong><br/>
      "Your account will be closed in 24 hours!"<br/>
      "Suspicious activity detected - verify now!"<br/>
      &#9888;&#65039; Legitimate companies don't create panic</p>
      
      <p><strong>2. Too Good to Be True</strong><br/>
      "You've won a prize!"<br/>
      "Get a free iPhone!"<br/>
      &#9888;&#65039; If it sounds too good to be true, it is</p>
      
      <p><strong>3. Impersonation</strong><br/>
      Emails or messages claiming to be from banks, government, or tech support<br/>
      &#9888;&#65039; Check the sender's actual email address carefully</p>
      
      <h3>Red Flags to Watch For</h3>
      <ul>
        <li><strong>Sender Address:</strong> paypal-support@paypa1.com (notice the "1" instead of "l")</li>
        <li><strong>Generic Greetings:</strong> "Dear Customer" instead of your name</li>
        <li><strong>Spelling/Grammar Errors:</strong> Professional companies proofread</li>
        <li><strong>Suspicious Links:</strong> Hover over links to see the real URL</li>
        <li><strong>Unexpected Attachments:</strong> Don't open unexpected files</li>
        <li><strong>Requests for Personal Info:</strong> Banks never ask for passwords via email</li>
      </ul>
      
      <h3>Checking Links Safely</h3>
      <p><strong>Before Clicking:</strong></p>
      <ol>
        <li>Hover your mouse over the link (don't click)</li>
        <li>Look at the URL that appears at the bottom of your browser</li>
        <li>Check for misspellings (amaz0n.com instead of amazon.com)</li>
        <li>Look for HTTPS and the lock icon</li>
        <li>If unsure, go directly to the website by typing the URL yourself</li>
      </ol>
      
      <h3>What To Do If You Clicked</h3>
      <p>If you accidentally clicked a phishing link or entered information:</p>
      <ol>
        <li><strong>Change passwords immediately</strong> - Start with email, then other accounts</li>
        <li><strong>Enable 2FA</strong> - Add extra security to all accounts</li>
        <li><strong>Monitor accounts</strong> - Check for unauthorized activity</li>
        <li><strong>Run antivirus scan</strong> - Check for malware</li>
        <li><strong>Contact your bank</strong> - If you shared financial info</li>
        <li><strong>Report the phishing</strong> - Forward to reportphishing@apwg.org</li>
      </ol>
      
      <h3>Real Examples</h3>
      <p>&#127907; "Your Amazon order #8472938 has been shipped" (you didn't order anything)<br/>
      &#127907; "IRS Tax Refund: Claim your $2,500" (IRS doesn't email about refunds)<br/>
      &#127907; "Your Netflix payment failed - update now" (check your Netflix app directly)</p>
    `,
    quiz: [
      {
        id: 1,
        question: 'What is phishing?',
        options: [
          'A type of computer virus',
          'Fraudulent attempts to obtain sensitive information',
          'Slow internet connection',
          'A social media feature'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which is a major red flag in a phishing email?',
        options: [
          'Personalized greeting with your name',
          'Creating urgency and fear',
          'Professional formatting',
          'Links to the official website'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Before clicking a link in an email, you should:',
        options: [
          'Click it immediately',
          'Forward it to friends',
          'Hover over it to see the actual URL',
          'Reply to the sender'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 6,
    title: 'Safe Online Shopping',
    description: 'Shop online securely by recognizing legitimate sites and protecting your payment information.',
    category: 'security',
    difficulty: 'beginner',
    duration_minutes: 14,
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    content: `
      <h2>Secure Online Shopping Practices</h2>
      <p>Online shopping is convenient, but it's important to protect yourself from fraud and scams.</p>
      
      <h3>Verifying Legitimate Websites</h3>
      <p><strong>Look for HTTPS:</strong></p>
      <ul>
        <li>URL should start with "https://" (the 's' means secure)</li>
        <li>Look for a padlock icon in the address bar</li>
        <li>Click the padlock to view the security certificate</li>
      </ul>
      
      <p><strong>Check the Domain:</strong></p>
      <ul>
        <li>Verify the exact spelling (amaz0n.com is fake, amazon.com is real)</li>
        <li>Be wary of unusual extensions (.xyz, .tk instead of .com)</li>
        <li>Look up reviews if it's an unfamiliar site</li>
      </ul>
      
      <h3>Payment Safety</h3>
      <p><strong>Safest Methods:</strong></p>
      <ol>
        <li><strong>Credit cards</strong> - Best fraud protection</li>
        <li><strong>PayPal</strong> - Doesn't share your card info with seller</li>
        <li><strong>Apple Pay/Google Pay</strong> - Tokenized transactions</li>
      </ol>
      
      <p><strong>Never Use:</strong></p>
      <ul>
        <li>Wire transfers or money orders</li>
        <li>Cryptocurrency for regular shopping</li>
        <li>Gift cards as payment</li>
      </ul>
      
      <h3>Warning Signs of Fake Stores</h3>
      <ul>
        <li>Prices significantly lower than elsewhere</li>
        <li>Poor website design or lots of typos</li>
        <li>No contact information or customer service</li>
        <li>Pushy tactics ("Limited time! Act now!")</li>
        <li>No return policy or suspicious terms</li>
        <li>Asks for unnecessary personal information</li>
      </ul>
      
      <h3>Protecting Your Information</h3>
      <ol>
        <li><strong>Use unique passwords</strong> for each shopping site</li>
        <li><strong>Never save payment info</strong> on websites (type it each time)</li>
        <li><strong>Check bank statements</strong> regularly for unauthorized charges</li>
        <li><strong>Shop on secure WiFi</strong> - avoid public networks</li>
        <li><strong>Keep receipts</strong> - Screenshot confirmations and save emails</li>
      </ol>
      
      <h3>If Something Goes Wrong</h3>
      <p><strong>Didn't receive your order:</strong></p>
      <ol>
        <li>Contact the seller first</li>
        <li>If no response, dispute with your payment provider</li>
        <li>Report to consumer protection agencies</li>
      </ol>
      
      <p><strong>Unauthorized charges:</strong></p>
      <ol>
        <li>Contact your bank/credit card company immediately</li>
        <li>Dispute the charge</li>
        <li>Change your passwords</li>
        <li>File a report at IdentityTheft.gov</li>
      </ol>
    `,
    quiz: [
      {
        id: 1,
        question: 'What does "HTTPS" indicate?',
        options: [
          'The website is popular',
          'The connection is encrypted and secure',
          'The website sells health products',
          'The website is fast'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which payment method offers the best fraud protection?',
        options: [
          'Wire transfer',
          'Gift cards',
          'Credit card',
          'Cash'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'A major red flag for a fake online store is:',
        options: [
          'Having a return policy',
          'Prices significantly lower than competitors',
          'Customer reviews',
          'Multiple payment options'
        ],
        correctAnswer: 1
      }
    ]
  }
];

export const useLessons = (filters = {}) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, [JSON.stringify(filters)]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredLessons = [...MOCK_LESSONS];

      // Apply filters
      if (filters.category) {
        filteredLessons = filteredLessons.filter(l => l.category === filters.category);
      }
      if (filters.difficulty) {
        filteredLessons = filteredLessons.filter(l => l.difficulty === filters.difficulty);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredLessons = filteredLessons.filter(l =>
          l.title.toLowerCase().includes(search) ||
          l.description.toLowerCase().includes(search)
        );
      }

      setLessons(filteredLessons);
      setPagination({
        count: filteredLessons.length,
        next: null,
        previous: null,
      });
    } catch (err) {
      setError(err.message || 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  return { lessons, loading, error, pagination, refetch: fetchLessons };
};

export const useLesson = (id) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchLesson();
    }
  }, [id]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const foundLesson = MOCK_LESSONS.find(l => l.id === parseInt(id));
      if (!foundLesson) {
        throw new Error('Lesson not found');
      }
      setLesson(foundLesson);
    } catch (err) {
      setError(err.message || 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  return { lesson, loading, error, refetch: fetchLesson };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      setCategories([
        { value: 'privacy', label: 'Privacy' },
        { value: 'safety', label: 'Safety' },
        { value: 'security', label: 'Security' },
        { value: 'awareness', label: 'Awareness' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading };
};

export const useDifficulties = () => {
  const [difficulties, setDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDifficulties();
  }, []);

  const fetchDifficulties = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDifficulties([
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { difficulties, loading };
};
