export class SWOTAnalysis {
  private readonly strengths: string[]
  private readonly weaknesses: string[]
  private readonly opportunities: string[]
  private readonly threats: string[]

  private constructor(
    strengths: string[],
    weaknesses: string[],
    opportunities: string[],
    threats: string[]
  ) {
    this.strengths = strengths
    this.weaknesses = weaknesses
    this.opportunities = opportunities
    this.threats = threats
  }

  static New(
    strengths: string[],
    weaknesses: string[],
    opportunities: string[],
    threats: string[]
  ): SWOTAnalysis {
    return new SWOTAnalysis(strengths, weaknesses, opportunities, threats)
  }

  public getStrengths(): string[] {
    return this.strengths
  }

  public getWeaknesses(): string[] {
    return this.weaknesses
  }

  public getOpportunities(): string[] {
    return this.opportunities
  }

  public getThreats(): string[] {
    return this.threats
  }
}
