import React from 'react'
import { App } from '@/concept/service/Service'
import ReportPage from './ReportPage'

export const dynamic = 'force-dynamic'

type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface Evaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
}

interface Concept {
  id: string
  problem: string
  evaluation: Evaluation | null
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const concept = await App.Queries.GetConcept.handle({
      id: params.id,
    })

    const conceptProps: Concept = {
      id: concept.getId().getValue(),
      problem: concept.getProblem().getValue(),
      evaluation: null,
    }

    const conceptEvaluation = concept.getEvaluation()

    if (conceptEvaluation) {
      const evaluation: Evaluation = {
        status: conceptEvaluation.getStatus(),
        marketExistence: conceptEvaluation.getMarketExistence(),
        painPoints: conceptEvaluation.getPainPoints(),
        recommendations: conceptEvaluation.getRecommendations(),
        targetAudience: conceptEvaluation.getTargetAudience(),
        suggestions: conceptEvaluation.getSuggestions(),
      }

      conceptProps.evaluation = evaluation
    }

    return <ReportPage concept={conceptProps} />
  } catch (e) {
    // FIXME: Add more fancy errors handling.
    // Also don't forget to catch real errors and app layer errors.

    return <p>{(e as Error).message}</p>
  }
}
