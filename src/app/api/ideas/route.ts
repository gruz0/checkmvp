import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { App } from '@/idea/service/Service'

export async function POST(request: Request) {
  Sentry.setTag('component', 'HTTP API')

  try {
    const formData = await request.json()

    const { idea_id, concept_id } = formData

    Sentry.setContext('payload', {
      idea_id: idea_id,
      concept_id: concept_id,
    })

    if (!idea_id) {
      return NextResponse.json(
        { error: 'Idea ID must be defined' },
        { status: 422 }
      )
    }

    if (!concept_id) {
      return NextResponse.json(
        { error: 'Concept ID must be defined' },
        { status: 422 }
      )
    }

    Sentry.setTags({
      idea_id: idea_id,
      concept_id: concept_id,
    })

    Sentry.setContext('idea', {
      idea_id: idea_id,
      status: 'creating',
    })

    await App.Commands.MakeReservation.handle({
      ideaId: idea_id,
      conceptId: concept_id,
    })

    return NextResponse.json(
      { success: true, message: 'Success' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error while reserving an idea:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while reserving an idea.' },
      { status: 500 }
    )
  }
}
