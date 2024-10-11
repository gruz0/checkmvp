export type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

export class ProblemEvaluation {
  private readonly status: Status
  private readonly suggestions: string[]
  private readonly recommendations: string[]
  private readonly painPoints: string[]
  private readonly marketExistence: string

  private constructor(
    status: Status,
    suggestions: string[],
    recommendations: string[],
    painPoints: string[],
    marketExistence: string
  ) {
    this.status = status
    this.suggestions = suggestions
    this.recommendations = recommendations
    this.painPoints = painPoints
    this.marketExistence = marketExistence
  }

  static New(
    status: Status,
    suggestions: string[],
    recommendations: string[],
    painPoints: string[],
    marketExistence: string
  ): ProblemEvaluation {
    return new ProblemEvaluation(
      status,
      suggestions,
      recommendations,
      painPoints,
      marketExistence
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

  public toJSON(): Record<string, unknown> {
    return {
      status: this.status,
      suggestions: this.suggestions,
      recommendations: this.recommendations,
      painPoints: this.painPoints,
      marketExistence: this.marketExistence,
    }
  }
}
