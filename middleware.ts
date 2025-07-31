import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createRateLimiter } from './lib/utils'

// Environment-specific configurations
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

// Create rate limiter instance with environment-specific limits
const rateLimiter = createRateLimiter(
    isProduction ? 100 : 1000, // More lenient in development
    isProduction ? 60000 : 60000 // 1 minute window
)

// Security headers configuration
const getSecurityHeaders = (request: NextRequest) => {
    const baseHeaders = {
        // Prevent XSS attacks
        'X-XSS-Protection': '1; mode=block',

        // Prevent MIME type sniffing
        'X-Content-Type-Options': 'nosniff',

        // Prevent clickjacking
        'X-Frame-Options': 'DENY',

        // Referrer Policy
        'Referrer-Policy': 'strict-origin-when-cross-origin',

        // Permissions Policy
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
    }

    // Environment-specific headers
    if (isProduction) {
        return {
            ...baseHeaders,
            // Strict Transport Security (HTTPS only in production)
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

            // Content Security Policy (stricter in production)
            'Content-Security-Policy': [
                "default-src 'self'",
                "script-src 'self'", // Removed unsafe-eval and unsafe-inline for production
                "style-src 'self' 'unsafe-inline'", // Keep unsafe-inline for Tailwind
                "img-src 'self' data: https:",
                "font-src 'self'",
                "connect-src 'self'",
                "media-src 'self'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'none'",
                "upgrade-insecure-requests"
            ].join('; '),

            // Cache control for sensitive pages
            'Cache-Control': 'no-store, max-age=0',
        }
    } else {
        return {
            ...baseHeaders,
            // More permissive CSP for development
            'Content-Security-Policy': [
                "default-src 'self'",
                "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https:",
                "font-src 'self'",
                "connect-src 'self'",
                "media-src 'self'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'none'"
            ].join('; '),
        }
    }
}

// Get client IP with better fallback logic
function getClientIP(request: NextRequest): string {
    // Check for forwarded IP from proxy/load balancer
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
        // Take the first IP if multiple are present
        return forwarded.split(',')[0].trim()
    }

    // Check for real IP
    const realIP = request.headers.get('x-real-ip')
    if (realIP) {
        return realIP
    }

    // Fallback to unknown if no IP found
    return 'unknown'
}

export function middleware(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const clientIP = getClientIP(request)

        // Skip rate limiting for development or specific paths
        const shouldSkipRateLimit = isDevelopment ||
            request.nextUrl.pathname.startsWith('/_next') ||
            request.nextUrl.pathname.startsWith('/api/health')

        // Check rate limiting (skip in development)
        if (!shouldSkipRateLimit && rateLimiter(clientIP)) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Too Many Requests',
                    message: 'Rate limit exceeded. Please try again later.',
                    retryAfter: 60
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60'
                    }
                }
            )
        }

        // Get the response
        const response = NextResponse.next()

        // Add security headers
        const securityHeaders = getSecurityHeaders(request)
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value)
        })

        // Add request ID for tracking (useful for debugging)
        if (isDevelopment) {
            response.headers.set('X-Request-ID', Math.random().toString(36).substring(7))
        }

        return response

    } catch (error) {
        // Log error in development
        if (isDevelopment) {
            console.error('Middleware error:', error)
        }

        // Return a safe response even if middleware fails
        const response = NextResponse.next()
        response.headers.set('X-Middleware-Error', 'true')
        return response
    }
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes) - but allow specific API routes
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files
         */
        '/((?!api/(?!health)|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|css|js)$).*)',
    ],
} 