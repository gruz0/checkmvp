import { RateLimiter } from '@/lib/rateLimiter/RateLimiter'
import type { Redis } from 'ioredis'

export type Limiter = string

interface RateLimiterConfig {
  limit: number
  timeframe: number
}

// FIXME: Make an interface and create a Redis implementation
export class RateLimiterManager {
  private static instance: RateLimiterManager
  private redisClient: Redis
  private limiters: Map<string, RateLimiter>

  private constructor(redisClient: Redis) {
    this.redisClient = redisClient
    this.limiters = new Map()
  }

  public static getInstance(redisClient: Redis): RateLimiterManager {
    if (!RateLimiterManager.instance) {
      RateLimiterManager.instance = new RateLimiterManager(redisClient)
    }
    return RateLimiterManager.instance
  }

  registerLimiter(key: Limiter, config: RateLimiterConfig): void {
    const limiter = this.getLimiter(key)

    if (limiter) {
      return
    }

    const newLimiter = new RateLimiter({
      redisClient: this.redisClient,
      key,
      limit: config.limit,
      timeframe: config.timeframe,
    })

    this.limiters.set(key, newLimiter)
  }

  getLimiter(key: Limiter): RateLimiter | null {
    return this.limiters.get(key) ?? null
  }
}
