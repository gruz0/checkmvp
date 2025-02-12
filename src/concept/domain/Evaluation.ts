import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationPlan } from '@/concept/domain/ValidationPlan'

export type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

// FIXME: It could be refactored to a factory class.
// To do so, we need to create separate classes for each evaluation type.
// Or it should be replaced by Builder pattern.
export class Evaluation {
  private readonly status: Status
  private readonly suggestions: string[]
  private readonly recommendations: string[]
  private readonly painPoints: string[]
  private readonly marketExistence: string
  private readonly targetAudience: TargetAudience[]
  private readonly clarityScore: ClarityScore
  private readonly languageAnalysis: LanguageAnalysis
  private readonly assumptionsAnalysis: AssumptionsAnalysis | null
  private readonly hypothesisFramework: HypothesisFramework | null
  private readonly validationPlan: ValidationPlan | null

  private constructor(
    status: Status,
    suggestions: string[],
    recommendations: string[],
    painPoints: string[],
    marketExistence: string,
    targetAudience: TargetAudience[],
    clarityScore: ClarityScore,
    languageAnalysis: LanguageAnalysis,
    assumptionsAnalysis: AssumptionsAnalysis | null,
    hypothesisFramework: HypothesisFramework | null,
    validationPlan: ValidationPlan | null
  ) {
    this.status = status
    this.suggestions = suggestions
    this.recommendations = recommendations
    this.painPoints = painPoints
    this.marketExistence = marketExistence
    this.targetAudience = targetAudience
    this.clarityScore = clarityScore
    this.languageAnalysis = languageAnalysis
    this.assumptionsAnalysis = assumptionsAnalysis
    this.hypothesisFramework = hypothesisFramework
    this.validationPlan = validationPlan

    this.validate()
  }

  public static New(
    status: Status,
    suggestions: string[],
    recommendations: string[],
    painPoints: string[],
    marketExistence: string,
    targetAudience: TargetAudience[],
    clarityScore: ClarityScore,
    languageAnalysis: LanguageAnalysis,
    assumptionsAnalysis: AssumptionsAnalysis | null,
    hypothesisFramework: HypothesisFramework | null,
    validationPlan: ValidationPlan | null
  ): Evaluation {
    return new Evaluation(
      status,
      suggestions.map((suggestion) => suggestion.trim()),
      recommendations.map((recommendation) => recommendation.trim()),
      painPoints.map((painPoint) => painPoint.trim()),
      marketExistence.trim(),
      targetAudience,
      clarityScore,
      languageAnalysis,
      assumptionsAnalysis,
      hypothesisFramework,
      validationPlan
    )
  }

  public getStatus(): Status {
    return this.status
  }

  public getSuggestions(): string[] {
    return this.suggestions
  }

  public getRecommendations(): string[] {
    return this.recommendations
  }

  public getPainPoints(): string[] {
    return this.painPoints
  }

  public getMarketExistence(): string {
    return this.marketExistence
  }

  public getTargetAudience(): TargetAudience[] {
    return this.targetAudience
  }

  public getClarityScore(): ClarityScore {
    return this.clarityScore
  }

  public getLanguageAnalysis(): LanguageAnalysis {
    return this.languageAnalysis
  }

  public getAssumptionsAnalysis(): AssumptionsAnalysis | null {
    return this.assumptionsAnalysis
  }

  public getHypothesisFramework(): HypothesisFramework | null {
    return this.hypothesisFramework
  }

  public getValidationPlan(): ValidationPlan | null {
    return this.validationPlan
  }

  private validate(): void {
    switch (this.status) {
      case 'well-defined':
        this.validateWellDefined()
        break

      case 'requires_changes':
        this.validateRequiresChanges()
        break

      case 'not-well-defined':
        this.validateNotWellDefined()
        break

      default:
        throw new Error(`Unsupported status: ${this.status}`)
    }
  }

  private validateWellDefined(): void {
    if (this.painPoints.length === 0) {
      throw new Error(`Pain points for ${this.status} must not be empty`)
    }

    if (!this.marketExistence) {
      throw new Error(`Market existence for ${this.status} must not be empty`)
    }

    if (this.targetAudience.length === 0) {
      throw new Error(`Target audience for ${this.status} must not be empty`)
    }

    if (!this.assumptionsAnalysis) {
      throw new Error(
        `Assumptions analysis for ${this.status} must not be empty`
      )
    }

    if (!this.hypothesisFramework) {
      throw new Error(
        `Hypothesis framework for ${this.status} must not be empty`
      )
    }

    if (!this.validationPlan) {
      throw new Error(`Validation plan for ${this.status} must not be empty`)
    }
  }

  private validateRequiresChanges(): void {
    if (this.suggestions.length === 0) {
      throw new Error(`Suggestions for ${this.status} must not be empty`)
    }

    if (this.recommendations.length === 0) {
      throw new Error(`Recommendations for ${this.status} must not be empty`)
    }

    if (this.painPoints.length === 0) {
      throw new Error(`Pain points for ${this.status} must not be empty`)
    }

    if (this.targetAudience.length === 0) {
      throw new Error(`Target audience for ${this.status} must not be empty`)
    }

    if (!this.assumptionsAnalysis) {
      throw new Error(
        `Assumptions analysis for ${this.status} must not be empty`
      )
    }

    if (!this.hypothesisFramework) {
      throw new Error(
        `Hypothesis framework for ${this.status} must not be empty`
      )
    }

    if (!this.validationPlan) {
      throw new Error(`Validation plan for ${this.status} must not be empty`)
    }
  }

  private validateNotWellDefined(): void {
    if (this.suggestions.length === 0) {
      throw new Error(`Suggestions for ${this.status} must not be empty`)
    }

    if (this.recommendations.length !== 0) {
      throw new Error(`Recommendations for ${this.status} must be empty`)
    }

    if (this.painPoints.length !== 0) {
      throw new Error(`Pain points for ${this.status} must be empty`)
    }

    if (this.marketExistence) {
      throw new Error(`Market existence for ${this.status} must be empty`)
    }

    if (this.targetAudience.length !== 0) {
      throw new Error(`Target audience for ${this.status} must be empty`)
    }

    if (this.assumptionsAnalysis) {
      throw new Error(`Assumptions analysis for ${this.status} must be empty`)
    }

    if (this.hypothesisFramework) {
      throw new Error(`Hypothesis framework for ${this.status} must be empty`)
    }

    if (this.validationPlan) {
      throw new Error(`Validation plan for ${this.status} must be empty`)
    }
  }
}
