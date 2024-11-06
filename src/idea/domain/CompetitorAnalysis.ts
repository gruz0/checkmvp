export interface Competitor {
  name: string
  productName: string
  url: string
  coreFeatures: string[]
  valueProposition: string
  userAcquisition: string
  strengths: string[]
  weaknesses: string[]
  differentiationOpportunity: string
}

export interface Comparison {
  strengths: string[]
  weaknesses: string[]
}

export class CompetitorAnalysis {
  private readonly competitors: Competitor[]
  private readonly comparison: Comparison
  private readonly differentiationSuggestions: string[]

  private constructor(
    competitors: Competitor[],
    comparison: Comparison,
    differentiationSuggestions: string[]
  ) {
    this.competitors = competitors
    this.comparison = comparison
    this.differentiationSuggestions = differentiationSuggestions
  }

  static New(
    competitors: Competitor[],
    comparison: Comparison,
    differentiationSuggestions: string[]
  ): CompetitorAnalysis {
    return new CompetitorAnalysis(
      competitors,
      comparison,
      differentiationSuggestions
    )
  }

  public getCompetitors(): Competitor[] {
    return this.competitors
  }

  public getComparison(): Comparison {
    return this.comparison
  }

  public getDifferentiationSuggestions(): string[] {
    return this.differentiationSuggestions
  }
}
