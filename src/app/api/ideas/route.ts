import { NextResponse } from 'next/server'
import { IdeaService } from '@/lib/IdeaService'
import { QueueServiceFactory } from '@/lib/QueueServiceFactory'
import { SQLiteIdeaRepository } from '@/lib/SQLiteIdeaRepository'

const queueService = QueueServiceFactory.createQueueService('bullmq')
const repository = new SQLiteIdeaRepository()
const ideaService = new IdeaService(repository, queueService)

export async function POST(request: Request) {
  try {
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

    const idea = await ideaService.createIdea(problem, targetAudience)

    return NextResponse.json({ id: idea.getId() }, { status: 201 })
  } catch (error) {
    console.error('Error while creating the idea:', error)

    return NextResponse.json(
      { error: 'Error while creating the idea.' },
      { status: 500 }
    )
  }
}
