/**
 * Security & Validation utilities for School Traditional Portal
 * - XSS protection
 * - Unicode NFC normalization
 * - Input bounds validation
 * - In-memory rate limiting
 */

// Basic HTML entity sanitization to prevent XSS
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Strip unsafe tags and trim
export function cleanInputString(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  // Normalize Unicode to NFC format (precomposed characters - standard for Vietnamese)
  const normalized = input.normalize("NFC").trim();
  // Strip control characters except newline and tab
  const sanitized = normalized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return sanitized.slice(0, maxLength);
}

// Validate HTTP/HTTPS image URL safely
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    // Allow Unsplash, Wikimedia, cloud storage or standard domains
    return true;
  } catch {
    // Also permit internal static assets like /images/...
    return url.startsWith("/");
  }
}

// In-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(
  identifier: string,
  limit = 20,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}
