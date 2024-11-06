export class MarketAnalysis {
  private readonly trends: string
  private readonly userBehaviors: string
  private readonly marketGaps: string
  private readonly innovationOpportunities: string
  private readonly strategicDirection: string

  private constructor(
    trends: string,
    userBehaviors: string,
    marketGaps: string,
    innovationOpportunities: string,
    strategicDirection: string
  ) {
    this.trends = trends
    this.userBehaviors = userBehaviors
    this.marketGaps = marketGaps
    this.innovationOpportunities = innovationOpportunities
    this.strategicDirection = strategicDirection
  }

  static New(
    trends: string,
    userBehaviors: string,
    marketGaps: string,
    innovationOpportunities: string,
    strategicDirection: string
  ): MarketAnalysis {
    return new MarketAnalysis(
      trends,
      userBehaviors,
      marketGaps,
      innovationOpportunities,
      strategicDirection
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
