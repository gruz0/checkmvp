import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  Sentry.setTag('component', 'HTTP API')

  try {
    const formData = await request.json()

    const { idea_id, section, feedback, contact } = formData

    // NOTE: We don't want to send the person's contact to Sentry
    Sentry.setContext('payload', {
      idea_id: idea_id,
      section: section,
      feedback: feedback,
    })

    if (!idea_id) {
      return NextResponse.json(
        { error: 'Idea ID must be defined' },
        { status: 422 }
      )
    }

    if (!section) {
      return NextResponse.json(
        { error: 'Section must be defined' },
        { status: 422 }
      )
    }

    Sentry.setTag('idea_id', idea_id)

    await prisma.feedback.create({
      data: {
        payload: JSON.stringify({
          type: 'idea_section_report',
          idea_id: idea_id,
          section: section,
          feedback: feedback,
          contact: contact,
        }),
      },
    })

    return NextResponse.json(
      { success: true, message: 'Success' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error while storing a feedback:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while storing a feedback.' },
      { status: 500 }
    )
  }
}
