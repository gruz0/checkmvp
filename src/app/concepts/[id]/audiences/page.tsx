import * as Sentry from '@sentry/nextjs'
import { notFound } from 'next/navigation'
import React from 'react'
import { App } from '@/concept/service/Service'
import TargetAudiences from './TargetAudiences'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const concept = await App.Queries.GetConcept.handle({
      id: params.id,
    })

    const conceptEvaluation = concept.getEvaluation()

    const targetAudiences = conceptEvaluation
      .getTargetAudience()
      .map((targetAudience) => ({
        id: targetAudience.getId(),
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
        why: targetAudience.getWhy(),
        painPoints: targetAudience.getPainPoints(),
        targetingStrategy: targetAudience.getTargetingStrategy(),
        statement: targetAudience.getStatement(),
        hypotheses: targetAudience.getHypotheses(),
        validationMetrics: {
          marketSize: targetAudience.getValidationMetrics().getMarketSize(),
          accessibility: targetAudience
            .getValidationMetrics()
            .getAccessibility(),
          painPointIntensity: targetAudience
            .getValidationMetrics()
            .getPainPointIntensity(),
          willingnessToPay: targetAudience
            .getValidationMetrics()
            .getWillingnessToPay(),
        },
      }))

    return (
      <TargetAudiences
        conceptId={concept.getId().getValue()}
        targetAudiences={targetAudiences}
      />
    )
  } catch (e) {
    if (e instanceof Error) {
      if ('isNotFoundError' in e) {
        notFound()
      }

      Sentry.captureException(e)

      return <p className="p-6 text-lg">{e.message}</p>
    }

    Sentry.captureException(e)

    return <p className="p-6 text-lg">An unexpected error occurred</p>
  }
}
