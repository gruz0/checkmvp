export class SWOTAnalysis {
  private constructor(
    private readonly strengths: string[],
    private readonly weaknesses: string[],
    private readonly opportunities: string[],
    private readonly threats: string[]
  ) {}

  static New(
    strengths: string[],
    weaknesses: string[],
    opportunities: string[],
    threats: string[]
  ): SWOTAnalysis {
    if (!Array.isArray(strengths) || strengths.length === 0) {
      throw new Error('Strengths cannot be empty')
    }

    strengths.forEach((item, index) => {
      if (typeof item !== 'string' || item.trim() === '') {
        throw new Error(`Strength at index ${index} must be a non-empty string`)
      }
    })

    if (!Array.isArray(weaknesses) || weaknesses.length === 0) {
      throw new Error('Weaknesses cannot be empty')
    }

    weaknesses.forEach((item, index) => {
      if (typeof item !== 'string' || item.trim() === '') {
        throw new Error(`Weakness at index ${index} must be a non-empty string`)
      }
    })

    if (!Array.isArray(opportunities) || opportunities.length === 0) {
      throw new Error('Opportunities cannot be empty')
    }

    opportunities.forEach((item, index) => {
      if (typeof item !== 'string' || item.trim() === '') {
        throw new Error(
          `Opportunity at index ${index} must be a non-empty string`
        )
      }
    })

    if (!Array.isArray(threats) || threats.length === 0) {
      throw new Error('Threats cannot be empty')
    }

    threats.forEach((item, index) => {
      if (typeof item !== 'string' || item.trim() === '') {
        throw new Error(`Threat at index ${index} must be a non-empty string`)
      }
    })

    return new SWOTAnalysis(
      strengths.map((item) => item.trim()),
      weaknesses.map((item) => item.trim()),
      opportunities.map((item) => item.trim()),
      threats.map((item) => item.trim())
    )
  }

  public getStrengths(): string[] {
    return [...this.strengths]
  }

  public getWeaknesses(): string[] {
    return [...this.weaknesses]
  }

  public getOpportunities(): string[] {
    return [...this.opportunities]
  }

  public getThreats(): string[] {
    return [...this.threats]
  }
}
