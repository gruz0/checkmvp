type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

export class Evaluation {
  private readonly status: Status
  private readonly suggestions: string[]
  private readonly recommendations: string[]
  private readonly painPoints: string[]
  private readonly marketExistence: string
  private readonly targetAudience: TargetAudience[]

  constructor(
    status: Status,
    suggestions: string[],
    recommendations: string[],
    painPoints: string[],
    marketExistence: string,
    targetAudience: TargetAudience[]
  ) {
    this.status = status
    this.suggestions = suggestions
    this.recommendations = recommendations
    this.painPoints = painPoints
    this.marketExistence = marketExistence
    this.targetAudience = targetAudience

    this.validate()
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
    if (this.suggestions.length !== 0) {
      throw new Error(`Suggestions for ${this.status} must be empty`)
    }

    if (this.recommendations.length !== 0) {
      throw new Error(`Recommendations for ${this.status} must be empty`)
    }

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

    if (this.painPoints.length !== 0) {
      throw new Error(`Pain points for ${this.status} must be empty`)
    }

    if (this.targetAudience.length !== 0) {
      throw new Error(`Target audience for ${this.status} must be empty`)
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
