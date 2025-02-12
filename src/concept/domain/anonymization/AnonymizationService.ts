import { Concept } from '@/concept/domain/Aggregate'
import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'
import { ValidationPlan } from '@/concept/domain/ValidationPlan'

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
      this.anonymizePersona(),
      concept.getRegion().getValue(),
      concept.getProductType().getValue(),
      concept.getStage().getValue(),
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
    return 'This problem has been anonymized and is no longer available for public view.'
  }

  private anonymizePersona(): string {
    return 'This persona has been anonymized and is no longer available for public view.'
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
      this.getLanguageAnalysis(evaluation.getLanguageAnalysis()),
      this.getAssumptionsAnalysis(evaluation.getAssumptionsAnalysis()),
      this.getHypothesisFramework(evaluation.getHypothesisFramework()),
      this.getValidationPlan(evaluation.getValidationPlan())
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
    return LanguageAnalysis.New(
      Array(languageAnalysis.getVagueTerms().length).fill('[REDACTED]'),
      Array(languageAnalysis.getMissingContext().length).fill('[REDACTED]'),
      Array(languageAnalysis.getAmbiguousStatements().length).fill('[REDACTED]')
    )
  }

  private getAssumptionsAnalysis(
    assumptionsAnalysis: AssumptionsAnalysis | null
  ): AssumptionsAnalysis | null {
    if (!assumptionsAnalysis) {
      return null
    }

    return AssumptionsAnalysis.New(
      Array(assumptionsAnalysis.getCoreAssumptions().length).fill('[REDACTED]'),
      1,
      assumptionsAnalysis.getRiskLevel(),
      Array(assumptionsAnalysis.getValidationMethods().length).fill(
        '[REDACTED]'
      )
    )
  }

  private getHypothesisFramework(
    hypothesisFramework: HypothesisFramework | null
  ): HypothesisFramework | null {
    if (!hypothesisFramework) {
      return null
    }

    return HypothesisFramework.New(
      '[REDACTED]',
      Array(hypothesisFramework.getExamples().length).fill('[REDACTED]')
    )
  }

  private getValidationPlan(
    validationPlan: ValidationPlan | null
  ): ValidationPlan | null {
    if (!validationPlan) {
      return null
    }

    return ValidationPlan.New(
      Array(validationPlan.getQuickWins().length).fill('[REDACTED]'),
      Array(validationPlan.getMediumEffort().length).fill('[REDACTED]'),
      Array(validationPlan.getDeepDive().length).fill('[REDACTED]'),
      Array(validationPlan.getSuccessCriteria().length).fill('[REDACTED]')
    )
  }
}
