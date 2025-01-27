export class ContextAnalysis {
  private constructor(
    private readonly problemDefinition: string,
    private readonly region: string,
    private readonly marketExistence: string[],
    private readonly existingSolutions: string[],
    private readonly mainChallenges: string[],
    private readonly targetUsers: string,
    private readonly whyItMatters: string,
    private readonly opportunities: string[],
    private readonly callToAction: string[]
  ) {}

  static New(
    problemDefinition: string,
    region: string,
    marketExistence: string[],
    existingSolutions: string[],
    mainChallenges: string[],
    targetUsers: string,
    whyItMatters: string,
    opportunities: string[],
    callToAction: string[]
  ): ContextAnalysis {
    if (!problemDefinition || problemDefinition.trim() === '') {
      throw new Error('Problem definition cannot be empty')
    }

    if (!region || region.trim() === '') {
      throw new Error('Region cannot be empty')
    }

    if (!Array.isArray(marketExistence) || marketExistence.length === 0) {
      throw new Error('Market existence cannot be empty')
    }

    if (!Array.isArray(existingSolutions) || existingSolutions.length === 0) {
      throw new Error('Existing solutions cannot be empty')
    }

    if (!Array.isArray(mainChallenges) || mainChallenges.length === 0) {
      throw new Error('Main challenges cannot be empty')
    }

    if (!targetUsers || targetUsers.trim() === '') {
      throw new Error('Target users cannot be empty')
    }

    if (!whyItMatters || whyItMatters.trim() === '') {
      throw new Error('Why it matters cannot be empty')
    }

    if (!Array.isArray(opportunities) || opportunities.length === 0) {
      throw new Error('Opportunities cannot be empty')
    }

    if (!Array.isArray(callToAction) || callToAction.length === 0) {
      throw new Error('Call to action cannot be empty')
    }

    return new ContextAnalysis(
      problemDefinition.trim(),
      region.trim(),
      marketExistence.map((item) => item.trim()),
      existingSolutions.map((item) => item.trim()),
      mainChallenges.map((item) => item.trim()),
      targetUsers.trim(),
      whyItMatters.trim(),
      opportunities.map((item) => item.trim()),
      callToAction.map((item) => item.trim())
    )
  }

  public getProblemDefinition(): string {
    return this.problemDefinition
  }

  public getRegion(): string {
    return this.region
  }

  public getMarketExistence(): string[] {
    return [...this.marketExistence]
  }

  public getExistingSolutions(): string[] {
    return [...this.existingSolutions]
  }

  public getMainChallenges(): string[] {
    return [...this.mainChallenges]
  }

  public getTargetUsers(): string {
    return this.targetUsers
  }

  public getWhyItMatters(): string {
    return this.whyItMatters
  }

  public getOpportunities(): string[] {
    return [...this.opportunities]
  }

  public getCallToAction(): string[] {
    return [...this.callToAction]
  }
}
