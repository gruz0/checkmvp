import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { App } from '@/idea/service/Service'

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const { idea_id, concept_id } = formData

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
