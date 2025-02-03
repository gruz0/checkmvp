import { TargetAudience } from '@/concept/domain/TargetAudience'

export type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

export interface ClarityScore {
  overallScore: number
  metrics: {
    problemClarity: number
    targetAudienceClarity: number
    scopeDefinition: number
    valuePropositionClarity: number
  }
}

export interface LanguageAnalysis {
  vagueTerms: string[]
  missingContext: string[]
  ambiguousStatements: string[]
}

export class Evaluation {
  private readonly status: Status
  private readonly suggestions: string[]
  private readonly recommendations: string[]
  private readonly painPoints: string[]
  private readonly marketExistence: string
  private readonly targetAudience: TargetAudience[]
  private readonly clarityScore: ClarityScore
  private readonly languageAnalysis: LanguageAnalysis

  private constructor(
    status: Status,
    suggestions: string[],
    recommendations: string[],
    painPoints: string[],
    marketExistence: string,
    targetAudience: TargetAudience[],
    clarityScore: ClarityScore,
    languageAnalysis: LanguageAnalysis
  ) {
    this.status = status
    this.suggestions = suggestions
    this.recommendations = recommendations
    this.painPoints = painPoints
    this.marketExistence = marketExistence
    this.targetAudience = targetAudience
    this.clarityScore = clarityScore
    this.languageAnalysis = languageAnalysis

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
    languageAnalysis: LanguageAnalysis
  ): Evaluation {
    return new Evaluation(
      status,
      suggestions.map((suggestion) => suggestion.trim()),
      recommendations.map((recommendation) => recommendation.trim()),
      painPoints.map((painPoint) => painPoint.trim()),
      marketExistence.trim(),
      targetAudience,
      clarityScore,
      languageAnalysis
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
  }
}
