import * as Sentry from '@sentry/nextjs'
import { notFound } from 'next/navigation'
import React from 'react'
import { App } from '@/concept/service/Service'
import ReportPage from './ReportPage'

export const dynamic = 'force-dynamic'

type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface TargetAudience {
  id: string
  segment: string
  description: string
  challenges: string[]
  why: string
  painPoints: string[]
  targetingStrategy: string
  statement: string
  hypotheses: string[]
  validationMetrics: {
    marketSize: string
    accessibility: number
    painPointIntensity: number
    willingnessToPay: number
  }
}

interface ClarityScore {
  overallScore: number
  metrics: {
    problemClarity: number
    targetAudienceClarity: number
    scopeDefinition: number
    valuePropositionClarity: number
  }
}

interface LanguageAnalysis {
  vagueTerms: string[]
  missingContext: string[]
  ambiguousStatements: string[]
}

interface Evaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
  clarityScore: ClarityScore
  languageAnalysis: LanguageAnalysis
}

interface Concept {
  id: string
  problem: string
  persona: string
  region: string
  productType: string
  stage: string
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
      persona: concept.getPersona().getValue(),
      region: concept.getRegion().getValue(),
      productType: concept.getProductType().getValue(),
      stage: concept.getStage().getValue(),
      evaluation: null,
    }

    if (concept.isEvaluated()) {
      const conceptEvaluation = concept.getEvaluation()

      const evaluation: Evaluation = {
        status: conceptEvaluation.getStatus(),
        marketExistence: conceptEvaluation.getMarketExistence(),
        painPoints: conceptEvaluation.getPainPoints(),
        recommendations: conceptEvaluation.getRecommendations(),
        targetAudience: conceptEvaluation
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
          })),
        suggestions: conceptEvaluation.getSuggestions(),
        clarityScore: {
          overallScore: conceptEvaluation.getClarityScore().getOverallScore(),
          metrics: conceptEvaluation.getClarityScore().getMetrics(),
        },
        languageAnalysis: {
          vagueTerms: conceptEvaluation.getLanguageAnalysis().getVagueTerms(),
          missingContext: conceptEvaluation
            .getLanguageAnalysis()
            .getMissingContext(),
          ambiguousStatements: conceptEvaluation
            .getLanguageAnalysis()
            .getAmbiguousStatements(),
        },
      }

      conceptProps.evaluation = evaluation
    }

    return <ReportPage concept={conceptProps} />
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
