import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { Identity } from '@/common/domain/Identity'
import { App } from '@/concept/service/Service'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  Sentry.setTag('component', 'HTTP API')
  Sentry.setTag('concept_id', params.id)

  try {
    const newIdeaId = Identity.Generate().getValue()

    Sentry.setTag('idea_id', newIdeaId)

    Sentry.setContext('concept', {
      concept_id: params.id,
      status: 'accepting',
    })

    await App.Commands.AcceptConcept.handle({
      id: params.id,
      newIdeaId: newIdeaId,
    })

    return NextResponse.json({ idea_id: newIdeaId }, { status: 201 })
  } catch (error) {
    console.error('Error while transitioning the concept to an idea:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while transitioning the concept to an idea.' },
      { status: 500 }
    )
  }
}
