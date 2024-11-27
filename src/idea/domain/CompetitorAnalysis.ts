import { Competitor } from '@/idea/domain/Competitor'

// TODO: Extract to a value object
interface Comparison {
  strengths: string[]
  weaknesses: string[]
}

export class CompetitorAnalysis {
  private constructor(
    private readonly competitors: Competitor[],
    private readonly comparison: Comparison,
    private readonly differentiationSuggestions: string[]
  ) {}

  static New(
    competitors: Competitor[],
    comparison: Comparison,
    differentiationSuggestions: string[]
  ): CompetitorAnalysis {
    if (!Array.isArray(competitors) || competitors.length === 0) {
      throw new Error('Competitors cannot be empty')
    }

    competitors.forEach((competitor, index) => {
      if (!(competitor instanceof Competitor)) {
        throw new Error(`Competitor at index ${index} is invalid`)
      }
    })

    if (!comparison) {
      throw new Error('Comparison cannot be null or undefined')
    }

    if (
      !Array.isArray(comparison.strengths) ||
      comparison.strengths.length === 0
    ) {
      throw new Error('Comparison strengths cannot be empty')
    }

    if (
      !Array.isArray(comparison.weaknesses) ||
      comparison.weaknesses.length === 0
    ) {
      throw new Error('Comparison weaknesses cannot be empty')
    }

    if (!Array.isArray(differentiationSuggestions)) {
      throw new Error('Differentiation suggestions must be an array')
    }

    return new CompetitorAnalysis(
      competitors,
      comparison,
      differentiationSuggestions
    )
  }

  public getCompetitors(): Competitor[] {
    return [...this.competitors]
  }

  public getComparison(): Comparison {
    return {
      strengths: this.comparison.strengths,
      weaknesses: this.comparison.weaknesses,
    }
  }

  public getDifferentiationSuggestions(): string[] {
    return [...this.differentiationSuggestions]
  }
}
