import { Concept } from '@/concept/domain/Aggregate'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation, LanguageAnalysis } from '@/concept/domain/Evaluation'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'

export interface Anonymization {
  anonymizeConcept(concept: Concept): Concept
}

export class Service implements Anonymization {
  public anonymizeConcept(concept: Concept): Concept {
    if (concept.isAnonymized()) {
      return concept
    }

    const anonymizedConcept = Concept.New(
      concept.getId().getValue(),
      this.anonymizeProblem(),
      concept.getRegion().getValue(),
      concept.getExpiryPeriodInDays(),
      concept.getTimeProvider(),
      concept.getCreatedAt()
    )

    if (concept.wasEvaluated()) {
      anonymizedConcept.evaluate(
        this.anonymizeEvaluation(concept.getEvaluation())
      )
    }

    if (concept.wasAccepted()) {
      anonymizedConcept.accept(concept.getIdeaId())
    }

    if (concept.wasArchived()) {
      anonymizedConcept.archive()
    }

    anonymizedConcept.anonymize()

    return anonymizedConcept
  }

  private anonymizeProblem(): string {
    return 'This concept has been anonymized and is no longer available.'
  }

  private anonymizeEvaluation(evaluation: Evaluation): Evaluation {
    return Evaluation.New(
      evaluation.getStatus(),
      this.getSuggestions(evaluation.getSuggestions()),
      this.getRecommendations(evaluation.getRecommendations()),
      this.getPainPoints(evaluation.getPainPoints()),
      this.getMarketExistence(evaluation.getMarketExistence()),
      this.getTargetAudience(evaluation.getTargetAudience()),
      this.getClarityScore(),
      this.getLanguageAnalysis(evaluation.getLanguageAnalysis())
    )
  }

  private getSuggestions(suggestions: string[]): string[] {
    return Array(suggestions.length).fill('[REDACTED]')
  }

  private getRecommendations(recommendations: string[]): string[] {
    return Array(recommendations.length).fill('[REDACTED]')
  }

  private getPainPoints(painPoints: string[]): string[] {
    return Array(painPoints.length).fill('[REDACTED]')
  }

  private getMarketExistence(marketExistence: string): string {
    // For not-well-defined concepts, the market existence is not provided.
    if (marketExistence.trim().length === 0) {
      return ''
    }

    return '[REDACTED]'
  }

  private getTargetAudience(
    targetAudience: TargetAudience[]
  ): TargetAudience[] {
    return targetAudience.map((audience) =>
      TargetAudience.New(
        '[REDACTED]',
        '[REDACTED]',
        Array(audience.getChallenges().length).fill('[REDACTED]'),
        ValidationMetrics.New('[REDACTED]', 1, 1, 1)
      )
    )
  }

  private getClarityScore(): ClarityScore {
    return ClarityScore.New(1, {
      problemClarity: 1,
      targetAudienceClarity: 1,
      scopeDefinition: 1,
      valuePropositionClarity: 1,
    })
  }

  private getLanguageAnalysis(
    languageAnalysis: LanguageAnalysis
  ): LanguageAnalysis {
    return {
      vagueTerms: Array(languageAnalysis.vagueTerms.length).fill('[REDACTED]'),
      missingContext: Array(languageAnalysis.missingContext.length).fill(
        '[REDACTED]'
      ),
      ambiguousStatements: Array(
        languageAnalysis.ambiguousStatements.length
      ).fill('[REDACTED]'),
    }
  }
}
