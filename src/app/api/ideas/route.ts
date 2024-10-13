import { NextResponse } from 'next/server'
import { IdeaService } from '@/lib/IdeaService'
import { QueueServiceFactory } from '@/lib/QueueServiceFactory'
import { SQLiteIdeaRepository } from '@/lib/SQLiteIdeaRepository'
import { createIdeaLimiterKey, manager } from '@/lib/rateLimiter'

const queueService = QueueServiceFactory.createQueueService('bullmq')
const repository = new SQLiteIdeaRepository()
const ideaService = new IdeaService(repository, queueService)

const createIdeaLimiter = manager.getLimiter(createIdeaLimiterKey)

export async function POST(request: Request) {
  try {
    if (!createIdeaLimiter) {
      throw new Error('Rate limiter is not available')
    }

    const formData = await request.json()

    const { problem, targetAudience } = formData

    if (!problem) {
      return NextResponse.json(
        { error: 'Problem must be defined' },
        { status: 422 }
      )
    }

    if (!targetAudience) {
      return NextResponse.json(
        { error: 'Target audience must be defined' },
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

    const idea = await ideaService.createIdea(problem, targetAudience)

    await createIdeaLimiter.updateCounter()

    return NextResponse.json({ id: idea.getId() }, { status: 201 })
  } catch (error) {
    console.error('Error while creating the idea:', error)

    return NextResponse.json(
      { error: 'Error while creating the idea.' },
      { status: 500 }
    )
  }
}
