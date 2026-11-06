/**
 * Simple fixed-window rate limiter per client IP.
 *
 * State lives in the memory of one server instance, so on serverless hosting
 * the limit applies per instance. That is enough to stop a single client from
 * hammering the free geocoding and routing services behind our API.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>()

  return function isAllowed(headers: Headers): boolean {
    const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()
    const record = hits.get(ip)

    if (!record || now > record.resetAt) {
      if (hits.size > 10_000) hits.clear()
      hits.set(ip, { count: 1, resetAt: now + windowMs })
      return true
    }
    if (record.count >= limit) return false

    record.count++
    return true
  }
}
