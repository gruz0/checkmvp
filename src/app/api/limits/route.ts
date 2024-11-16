import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { createIdeaLimiterKey, manager } from '@/lib/rateLimiter'

export const dynamic = 'force-dynamic'

export async function GET() {
  Sentry.setTag('component', 'HTTP API')

  try {
    const createIdeaLimiter = manager.getLimiter(createIdeaLimiterKey)

    if (!createIdeaLimiter) {
      throw new Error('Rate limiter is not available')
    }

    const isAllowed = await createIdeaLimiter.isAllowed()

    const { remaining, resetAt } =
      await createIdeaLimiter.getRemainingRequests()

    return NextResponse.json(
      [
        {
          key: createIdeaLimiterKey,
          is_allowed: isAllowed,
          limit: createIdeaLimiter.getLimit(),
          timeframe: createIdeaLimiter.getTimeframe(),
          remaining: remaining,
          resetAt: resetAt,
        },
      ],
      { status: 200 }
    )
  } catch (error) {
    console.error('Error while getting the limits:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while getting the limits.' },
      { status: 500 }
    )
  }
}
