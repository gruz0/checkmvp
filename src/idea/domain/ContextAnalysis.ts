// TODO: Extract to a value object
interface KeyMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

// TODO: Extract to a value object
interface ActionPriority {
  action: string
  impact: number
  effort: number
  impactDescription: string
  effortDescription: string
}

export class ContextAnalysis {
  private constructor(
    private readonly problemDefinition: string,
    private readonly marketExistence: string[],
    private readonly existingSolutions: string[],
    private readonly mainChallenges: string[],
    private readonly targetUsers: string,
    private readonly whyItMatters: string,
    private readonly opportunities: string[],
    private readonly callToAction: string[],
    private readonly keyMetrics: KeyMetric[],
    private readonly actionPriorities: ActionPriority[]
  ) {}

  static New(
    problemDefinition: string,
    marketExistence: string[],
    existingSolutions: string[],
    mainChallenges: string[],
    targetUsers: string,
    whyItMatters: string,
    opportunities: string[],
    callToAction: string[],
    keyMetrics: KeyMetric[],
    actionPriorities: ActionPriority[]
  ): ContextAnalysis {
    if (!problemDefinition || problemDefinition.trim() === '') {
      throw new Error('Problem definition cannot be empty')
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

    if (!Array.isArray(keyMetrics) || keyMetrics.length === 0) {
      throw new Error('Key metrics cannot be empty')
    }

    // Add validation for key metrics trend values
    const validTrends = ['up', 'down', 'neutral'] as const
    keyMetrics.forEach((metric) => {
      if (!validTrends.includes(metric.trend)) {
        throw new Error('Invalid trend value. Must be up, down, or neutral')
      }
    })

    if (!Array.isArray(actionPriorities) || actionPriorities.length === 0) {
      throw new Error('Action priorities cannot be empty')
    }

    // Add validation for action priority effort values
    actionPriorities.forEach((priority) => {
      if (priority.impact < 1 || priority.impact > 10) {
        throw new Error('Action priority impact must be between 1 and 10')
      }

      if (priority.effort < 1 || priority.effort > 10) {
        throw new Error('Action priority effort must be between 1 and 10')
      }
    })

    // Add validation for empty strings in arrays
    if (marketExistence.some((item) => !item || item.trim() === '')) {
      throw new Error('Market existence items cannot be empty')
    }

    if (existingSolutions.some((item) => !item || item.trim() === '')) {
      throw new Error('Existing solutions items cannot be empty')
    }

    if (mainChallenges.some((item) => !item || item.trim() === '')) {
      throw new Error('Main challenges items cannot be empty')
    }

    if (opportunities.some((item) => !item || item.trim() === '')) {
      throw new Error('Opportunities items cannot be empty')
    }

    if (callToAction.some((item) => !item || item.trim() === '')) {
      throw new Error('Call to action items cannot be empty')
    }

    if (
      keyMetrics.some(
        (metric) =>
          !metric.label?.trim() ||
          !metric.value?.trim() ||
          !metric.change?.trim()
      )
    ) {
      throw new Error('Key metrics items cannot have empty values')
    }

    if (
      actionPriorities.some(
        (priority) =>
          !priority.action?.trim() ||
          !priority.impactDescription?.trim() ||
          !priority.effortDescription?.trim()
      )
    ) {
      throw new Error('Action priorities items cannot have empty values')
    }

    return new ContextAnalysis(
      problemDefinition.trim(),
      marketExistence.map((item) => item.trim()),
      existingSolutions.map((item) => item.trim()),
      mainChallenges.map((item) => item.trim()),
      targetUsers.trim(),
      whyItMatters.trim(),
      opportunities.map((item) => item.trim()),
      callToAction.map((item) => item.trim()),
      keyMetrics,
      actionPriorities
    )
  }

  public getProblemDefinition(): string {
    return this.problemDefinition
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

  public getKeyMetrics(): KeyMetric[] {
    return [...this.keyMetrics]
  }

  public getActionPriorities(): ActionPriority[] {
    return [...this.actionPriorities]
  }
}
