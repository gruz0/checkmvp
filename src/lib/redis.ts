import Redis from 'ioredis'
import { env } from '@/lib/env'

const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 0,
  lazyConnect: true,
  showFriendlyErrorStack: true,
  retryStrategy: (times: number) => {
    if (times > 3) {
      throw new Error(`[Redis] Could not connect after ${times} attempts`)
    }

    return Math.min(times * 200, 1000)
  },
})

redisClient.on('error', (error: unknown) => {
  console.warn('[Redis] Error connecting', error)
})

export { redisClient }
