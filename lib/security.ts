// Security configuration and utilities

// Input validation patterns
export const VALIDATION_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9\s]+$/,
    NUMERIC: /^\d+$/,
    DECIMAL: /^\d+(\.\d{1,2})?$/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
    URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
} as const;

// Security constants
export const SECURITY_CONFIG = {
    MAX_STRING_LENGTH: 1000,
    MAX_URL_LENGTH: 2000,
    MAX_JSON_LENGTH: 10000,
    RATE_LIMIT_REQUESTS: 100,
    RATE_LIMIT_WINDOW_MS: 60000, // 1 minute
    SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
} as const;

// XSS prevention - list of dangerous patterns
export const DANGEROUS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /data:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
] as const;

// SQL injection prevention patterns
export const SQL_INJECTION_PATTERNS = [
    /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute|script)\b)/gi,
    /(--|\/\*|\*\/|;)/g,
    /(\b(and|or)\b\s+\d+\s*=\s*\d+)/gi,
    /(\b(and|or)\b\s+['"]?\w+['"]?\s*=\s*['"]?\w+['"]?)/gi,
] as const;

// Security utility functions
export function containsDangerousPatterns(input: string): boolean {
    return DANGEROUS_PATTERNS.some(pattern => pattern.test(input));
}

export function containsSqlInjection(input: string): boolean {
    return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input));
}

export function validateEmail(email: string): boolean {
    return VALIDATION_PATTERNS.EMAIL.test(email);
}

export function validatePassword(password: string): boolean {
    return VALIDATION_PATTERNS.PASSWORD.test(password);
}

export function validateUrl(url: string): boolean {
    return VALIDATION_PATTERNS.URL.test(url);
}

// CSRF token generation (for future use)
export function generateCSRFToken(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

// Secure random string generation
export function generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Content Security Policy builder
export function buildCSP(options: {
    allowInlineScripts?: boolean;
    allowEval?: boolean;
    allowExternalScripts?: string[];
    allowExternalStyles?: string[];
    allowExternalImages?: string[];
} = {}) {
    const {
        allowInlineScripts = false,
        allowEval = false,
        allowExternalScripts = [],
        allowExternalStyles = [],
        allowExternalImages = [],
    } = options;

    const directives = [
        "default-src 'self'",
       /*  `script-src 'self'${allowInlineScripts ? " 'unsafe-inline'" : ""}${allowEval ? " 'unsafe-eval'" : ""}${allowExternalScripts.length > 0 ? ` ${allowExternalScripts.join(' ')}` : ""}`,
        `style-src 'self'${allowInlineScripts ? " 'unsafe-inline'" : ""}${allowExternalStyles.length > 0 ? ` ${allowExternalStyles.join(' ')}` : ""}`, */
        `img-src 'self' data:${allowExternalImages.length > 0 ? ` ${allowExternalImages.join(' ')}` : ""}`,
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
    ];

    return directives.join('; ');
}

// Security headers configuration
export const SECURITY_HEADERS = {
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'payment=()',
        'usb=()',
        'magnetometer=()',
        'gyroscope=()',
        'accelerometer=()'
    ].join(', '),
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cache-Control': 'no-store, max-age=0',
} as const; 