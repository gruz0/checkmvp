import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Identity } from '@/common/domain/Identity'
import { App } from '@/concept/service/Service'

const ConceptFormSchema = z.object({
  target_audience_id: z.string().min(1, 'Target audience ID is required'),
  statement: z
    .string()
    .min(10, 'Statement must be at least 10 characters long'),
  hypotheses: z
    .string()
    .min(10, 'Hypotheses must be at least 10 characters long'),
})

export type ConceptFormData = z.infer<typeof ConceptFormSchema>

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  Sentry.setTag('component', 'HTTP API')
  Sentry.setTag('concept_id', params.id)

  try {
    const formData = await request.json()

    const validationResult = ConceptFormSchema.safeParse(formData)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    const newIdeaId = Identity.Generate().getValue()

    Sentry.setTag('idea_id', newIdeaId)

    Sentry.setContext('concept', {
      concept_id: params.id,
      target_audience_id: formData.target_audience_id,
      statement: formData.statement,
      hypotheses: formData.hypotheses,
      status: 'accepting',
    })

    await App.Commands.AcceptConcept.handle({
      id: params.id,
      newIdeaId: newIdeaId,
      targetAudienceId: formData.target_audience_id,
      statement: formData.statement,
      hypotheses: formData.hypotheses,
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
