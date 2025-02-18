import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { App } from '@/idea/service/Service'

export async function POST(request: Request) {
  Sentry.setTag('component', 'HTTP API')

  try {
    const formData = await request.json()

    // FIXME: Refactor this to use zod
    const { idea_id, concept_id, target_audience_id, statement, hypotheses } =
      formData

    Sentry.setContext('payload', {
      idea_id: idea_id,
      concept_id: concept_id,
      target_audience_id: target_audience_id,
      statement: statement,
      hypotheses: hypotheses,
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

    if (!target_audience_id) {
      return NextResponse.json(
        { error: 'Target audience ID must be defined' },
        { status: 422 }
      )
    }

    if (!statement) {
      return NextResponse.json(
        { error: 'Statement must be defined' },
        { status: 422 }
      )
    }

    if (!hypotheses) {
      return NextResponse.json(
        { error: 'Hypotheses must be defined' },
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
      targetAudienceId: target_audience_id,
      statement: statement,
      hypotheses: hypotheses,
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
