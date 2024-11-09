import { NextResponse } from 'next/server'
import { Service } from '@/common/client/Feedback/Service'
import { App } from '@/idea/service/Service'
import { env } from '@/lib/env'

const feedbackService = new Service(env.FEEDBACK_SERVICE_API_BASE)

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.json()

    const { section, feedback, contact } = formData

    if (!section) {
      return NextResponse.json(
        { error: 'Section must be defined' },
        { status: 422 }
      )
    }

    const idea = await App.Queries.GetIdea.handle({ id: params.id })

    await feedbackService.reportIdeaSection(idea.id, section, feedback, contact)

    return NextResponse.json(
      { success: true, message: 'Feedback has been added' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error while sending a feedback:', error)

    return NextResponse.json(
      { error: 'Error while sending a feedback' },
      { status: 500 }
    )
  }
}
