import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { App } from '@/concept/service/Service'

const ConceptForReservationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  content: z
    .object({
      problem: z.string().min(1),
      market_existence: z.string().min(1),
      target_audience: z.array(
        z.object({
          segment: z.string().min(1),
          description: z.string().min(1),
          challenges: z.array(z.string().min(1)),
        })
      ),
    })
    .optional(),
})

type ConceptForReservationResponse = z.infer<
  typeof ConceptForReservationResponseSchema
>

export async function GET(_: Request, { params }: { params: { id: string } }) {
  Sentry.setTag('component', 'HTTP API')
  Sentry.setTag('concept_id', params.id)

  try {
    Sentry.setContext('concept', {
      concept_id: params.id,
      status: 'fetching_for_idea_reservation',
    })

    const concept = await App.Queries.GetConcept.handle({
      id: params.id,
    })

    if (!concept.isEvaluated()) {
      throw new Error(`Concept ${params.id} was not evaluated`)
    }

    if (concept.isArchived()) {
      throw new Error(`Concept ${params.id} was archived`)
    }

    const evaluation = concept.getEvaluation()

    if (!evaluation) {
      throw new Error(`Concept ${params.id} does not have evaluation`)
    }

    const response: ConceptForReservationResponse = {
      success: true,
      message: 'Concept is ready for the reservation',
      content: {
        problem: concept.getProblem().getValue(),
        market_existence: evaluation.getMarketExistence(),
        target_audience: evaluation
          .getTargetAudience()
          .map((targetAudience) => ({
            segment: targetAudience.segment,
            description: targetAudience.description,
            challenges: targetAudience.challenges,
          })),
      },
    }

    ConceptForReservationResponseSchema.parse(response)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Error while getting the concept for reservation:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while getting the concept for reservation.' },
      { status: 500 }
    )
  }
}
