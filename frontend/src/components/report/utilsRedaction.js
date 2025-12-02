// Shared simple redaction utility for review screen
const PII_REGEX = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    phone: /\b(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    credit_card: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    full_name: /\b(my name is|i am|i'm|called)\s+([A-Z][a-z]+\s+[A-Z][a-z]+)\b/gi,
};

export const redactLocal = (text) => {
    if (!text) return text;
    let redacted = text;
    Object.entries(PII_REGEX).forEach(([key, regex]) => {
        if (key === 'full_name') {
            redacted = redacted.replace(regex, (m, p1) => `${p1} [NAME_REDACTED]`);
        } else {
            redacted = redacted.replace(regex, `[${key.toUpperCase()}_REDACTED]`);
        }
    });
    return redacted;
};
