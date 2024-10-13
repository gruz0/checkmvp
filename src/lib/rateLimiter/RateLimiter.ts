import type { Redis } from 'ioredis'

interface RateLimitOptions {
  redisClient: Redis
  key: string
  limit: number
  timeframe: number
}

// FIXME: Make an interface and create a Redis implementation
export class RateLimiter {
  private redisClient: Redis
  private key: string
  private limit: number
  private timeframe: number

  constructor({ redisClient, key, limit, timeframe }: RateLimitOptions) {
    this.redisClient = redisClient
    this.key = key
    this.limit = limit
    this.timeframe = timeframe
  }

  private getRedisKey(): string {
    return this.key
  }

  getLimit(): number {
    return this.limit
  }

  getTimeframe(): number {
    return this.timeframe
  }

  async isAllowed(): Promise<boolean> {
    const count = await this.redisClient.get(this.getRedisKey())
    return count === null || parseInt(count, 10) < this.limit
  }

  async getRemainingRequests(): Promise<{ remaining: number; resetAt: Date }> {
    const count = await this.redisClient.get(this.getRedisKey())
    const remaining = this.limit - (count ? parseInt(count, 10) : 0)
    const ttl = await this.redisClient.ttl(this.getRedisKey())
    const resetAt = new Date(Date.now() + ttl * 1000)
    return { remaining: Math.max(remaining, 0), resetAt }
  }

  async updateCounter(): Promise<void> {
    const redisKey = this.getRedisKey()
    const count = await this.redisClient.incr(redisKey)

    if (count === 1) {
      await this.redisClient.expire(redisKey, this.timeframe)
    }
  }

  async resetCounter(): Promise<void> {
    await this.redisClient.del(this.getRedisKey())
  }
}
