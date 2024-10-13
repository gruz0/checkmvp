import { env } from '@/lib/env'
import { RateLimiterManager } from '@/lib/rateLimiter/RateLimiterManager'
import type { Limiter } from '@/lib/rateLimiter/RateLimiterManager'
import { redisClient } from '@/lib/redis'

const createIdeaLimiterKey: Limiter = 'createIdeaLimiter'

const registerManager = (): RateLimiterManager => {
  const rateLimiterManager = RateLimiterManager.getInstance(redisClient)

  rateLimiterManager.registerLimiter(createIdeaLimiterKey, {
    limit: env.CREATE_IDEA_LIMITER_LIMIT,
    timeframe: env.CREATE_IDEA_LIMITER_TIMEFRAME,
  })

  return rateLimiterManager
}

const getLimits = async (
  key: string
): Promise<{
  isAllowed: boolean
  limit: number
  remaining: number
  resetAt: Date
}> => {
  const limiter = manager.getLimiter(key)

  if (!limiter) {
    throw new Error(`Limiter for ${key} does not exist`)
  }

  const isAllowed = await limiter.isAllowed()
  const limit = limiter.getLimit()
  const { remaining, resetAt } = await limiter.getRemainingRequests()

  return { isAllowed, limit, remaining, resetAt }
}

const globalForRateLimiter = global as unknown as {
  manager: RateLimiterManager | undefined
}

const manager = globalForRateLimiter.manager ?? registerManager()

if (process.env.NODE_ENV !== 'production') {
  globalForRateLimiter.manager = manager
}

export { manager, createIdeaLimiterKey, getLimits }
