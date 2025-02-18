import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { App } from '@/concept/service/Service'
import {
  ApplicationError,
  ConceptArchivedError,
  ConceptNotEvaluatedError,
} from './errors'

const ConceptForReservationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  content: z
    .object({
      problem: z.string().min(64),
      persona: z.string().min(64),
      region: z.string().min(1),
      product_type: z.string().min(1),
      stage: z.string().min(1),
      market_existence: z.string().min(1),
      target_audience: z.array(
        z.object({
          id: z.string().min(1),
          segment: z.string().min(1),
          description: z.string().min(1),
          challenges: z.array(z.string().min(1)),
          why: z.string().min(1),
          pain_points: z.array(z.string().min(1)),
          targeting_strategy: z.string().min(1),
          validation_metrics: z.object({
            market_size: z.string().min(1),
            accessibility: z.number().min(0).max(10),
            pain_point_intensity: z.number().min(0).max(10),
            willingness_to_pay: z.number().min(0).max(10),
          }),
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

    if (!concept.wasEvaluated()) {
      throw new ConceptNotEvaluatedError(params.id)
    }

    if (concept.isArchived()) {
      throw new ConceptArchivedError(params.id)
    }

    const evaluation = concept.getEvaluation()

    const response: ConceptForReservationResponse = {
      success: true,
      message: 'Concept is ready for the reservation',
      content: {
        problem: concept.getProblem().getValue(),
        persona: concept.getPersona().getValue(),
        region: concept.getRegion().getValue(),
        product_type: concept.getProductType().getValue(),
        stage: concept.getStage().getValue(),
        market_existence: evaluation.getMarketExistence(),
        target_audience: evaluation
          .getTargetAudience()
          .map((targetAudience) => ({
            id: targetAudience.getId(),
            segment: targetAudience.getSegment(),
            description: targetAudience.getDescription(),
            challenges: targetAudience.getChallenges(),
            why: targetAudience.getWhy(),
            pain_points: targetAudience.getPainPoints(),
            targeting_strategy: targetAudience.getTargetingStrategy(),
            validation_metrics: {
              market_size: targetAudience
                .getValidationMetrics()
                .getMarketSize(),
              accessibility: targetAudience
                .getValidationMetrics()
                .getAccessibility(),
              pain_point_intensity: targetAudience
                .getValidationMetrics()
                .getPainPointIntensity(),
              willingness_to_pay: targetAudience
                .getValidationMetrics()
                .getWillingnessToPay(),
            },
          })),
      },
    }

    ConceptForReservationResponseSchema.parse(response)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    Sentry.captureException(error)

    if (error instanceof ApplicationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { error: 'Error while getting the concept for reservation.' },
      { status: 500 }
    )
  }
}
