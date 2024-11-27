export class MarketAnalysis {
  private constructor(
    private readonly trends: string,
    private readonly userBehaviors: string,
    private readonly marketGaps: string,
    private readonly innovationOpportunities: string,
    private readonly strategicDirection: string
  ) {}

  static New(
    trends: string,
    userBehaviors: string,
    marketGaps: string,
    innovationOpportunities: string,
    strategicDirection: string
  ): MarketAnalysis {
    if (!trends || trends.trim() === '') {
      throw new Error('Trends cannot be empty')
    }

    if (!userBehaviors || userBehaviors.trim() === '') {
      throw new Error('User behaviors cannot be empty')
    }

    if (!marketGaps || marketGaps.trim() === '') {
      throw new Error('Market gaps cannot be empty')
    }

    if (!innovationOpportunities || innovationOpportunities.trim() === '') {
      throw new Error('Innovation opportunities cannot be empty')
    }

    if (!strategicDirection || strategicDirection.trim() === '') {
      throw new Error('Strategic direction cannot be empty')
    }

    return new MarketAnalysis(
      trends.trim(),
      userBehaviors.trim(),
      marketGaps.trim(),
      innovationOpportunities.trim(),
      strategicDirection.trim()
    )
  }

  public getTrends(): string {
    return this.trends
  }

  public getUserBehaviors(): string {
    return this.userBehaviors
  }

  public getMarketGaps(): string {
    return this.marketGaps
  }

  public getInnovationOpportunities(): string {
    return this.innovationOpportunities
  }

  public getStrategicDirection(): string {
    return this.strategicDirection
  }
}
