import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Input sanitization utilities
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length
}

export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';

  const sanitized = url.trim();

  // Only allow http/https protocols
  if (!sanitized.match(/^https?:\/\//)) {
    return '';
  }

  // Remove potential XSS vectors
  return sanitized
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .slice(0, 2000);
}

export function sanitizeJson(jsonString: string): string {
  if (typeof jsonString !== 'string') return '';

  try {
    // Parse and re-stringify to validate JSON
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch {
    return '';
  }
}

export function sanitizeNumber(input: string | number): number {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  return isNaN(num) ? 0 : Math.max(0, num);
}

export function sanitizeDate(dateString: string): string {
  if (typeof dateString !== 'string') return '';

  // Only allow YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString) ? dateString : '';
}

// Rate limiting utility
export function createRateLimiter(maxRequests: number = 10, windowMs: number = 60000) {
  const requests = new Map<string, number[]>();

  return function isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return true; // Rate limited
    }

    // Add current request
    validRequests.push(now);
    requests.set(identifier, validRequests);

    return false; // Not rate limited
  };
}
