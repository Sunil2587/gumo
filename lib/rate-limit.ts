// Simple in-memory rate limiter
// For production, use Redis or a dedicated service

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max requests per interval
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10, // 10 requests per minute
  }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const now = Date.now()
  const tokenCount = store[identifier] || { count: 0, resetTime: now + config.interval }

  if (now > tokenCount.resetTime) {
    // Reset the counter
    tokenCount.count = 0
    tokenCount.resetTime = now + config.interval
  }

  tokenCount.count++
  store[identifier] = tokenCount

  const success = tokenCount.count <= config.uniqueTokenPerInterval
  const remaining = Math.max(0, config.uniqueTokenPerInterval - tokenCount.count)

  return {
    success,
    limit: config.uniqueTokenPerInterval,
    remaining,
    reset: tokenCount.resetTime,
  }
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 60 * 1000) // Clean up every minute
