import { randomUUID } from 'crypto'
import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { App } from '@/concept/service/Service'
import { createIdeaLimiterKey, manager } from '@/lib/rateLimiter'

const createIdeaLimiter = manager.getLimiter(createIdeaLimiterKey)

export async function POST(request: Request) {
  try {
    if (!createIdeaLimiter) {
      throw new Error('Rate limiter is not available')
    }

    const formData = await request.json()

    const { problem } = formData

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem must be defined' },
        { status: 422 }
      )
    }

    const { remaining, resetAt } =
      await createIdeaLimiter.getRemainingRequests()

    if (remaining === 0) {
      return NextResponse.json(
        {
          error:
            'Rate limit exceeded. Please wait until ' + resetAt.toUTCString(),
        },
        { status: 429 }
      )
    }

    const conceptId = randomUUID()

    await App.Commands.EvaluateConcept.handle({
      id: conceptId,
      problem: problem,
    })

    await createIdeaLimiter.updateCounter()

    return NextResponse.json({ id: conceptId }, { status: 201 })
  } catch (error) {
    console.error('Error while creating a concept:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while creating a concept.' },
      { status: 500 }
    )
  }
}
