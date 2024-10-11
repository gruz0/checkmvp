export type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

export type Recommendation = {
  segment: string
  commonPainPoints: string[]
  interaction: string
  targetingStrategy: string
}

export class TargetAudienceEvaluation {
  private readonly status: Status
  private readonly existence: string
  private readonly suggestions: string[]
  private readonly recommendations: Recommendation[]

  private constructor(
    status: Status,
    existence: string,
    suggestions: string[],
    recommendations: Recommendation[]
  ) {
    this.status = status
    this.existence = existence
    this.suggestions = suggestions
    this.recommendations = recommendations
  }

  static New(
    status: Status,
    existence: string,
    suggestions: string[],
    recommendations: Recommendation[]
  ): TargetAudienceEvaluation {
    return new TargetAudienceEvaluation(
      status,
      existence,
      suggestions,
      recommendations
    )
  }

  public getStatus(): Status {
    return this.status
  }

  public getExistence(): string {
    return this.existence
  }

  public getSuggestions(): string[] {
    return this.suggestions
  }

  public getRecommendations(): Recommendation[] {
    return this.recommendations
  }

  public toJSON(): Record<string, unknown> {
    return {
      status: this.status,
      existence: this.existence,
      suggestions: this.suggestions,
      recommendations: this.recommendations,
    }
  }
}
