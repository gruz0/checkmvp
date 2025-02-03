export class ClarityScore {
  private constructor(
    private readonly overallScore: number,
    private readonly metrics: {
      problemClarity: number
      targetAudienceClarity: number
      scopeDefinition: number
      valuePropositionClarity: number
    }
  ) {}

  public static New(
    overallScore: number,
    metrics: {
      problemClarity: number
      targetAudienceClarity: number
      scopeDefinition: number
      valuePropositionClarity: number
    }
  ): ClarityScore {
    this.validateInteger(overallScore, 'Overall score')
    this.validateRange(overallScore, 'Overall score')

    this.validateInteger(metrics.problemClarity, 'Problem clarity score')
    this.validateRange(metrics.problemClarity, 'Problem clarity score')

    this.validateInteger(
      metrics.targetAudienceClarity,
      'Target audience clarity score'
    )
    this.validateRange(
      metrics.targetAudienceClarity,
      'Target audience clarity score'
    )

    this.validateInteger(metrics.scopeDefinition, 'Scope definition score')
    this.validateRange(metrics.scopeDefinition, 'Scope definition score')

    this.validateInteger(
      metrics.valuePropositionClarity,
      'Value proposition clarity score'
    )
    this.validateRange(
      metrics.valuePropositionClarity,
      'Value proposition clarity score'
    )

    return new ClarityScore(overallScore, metrics)
  }

  public getOverallScore(): number {
    return this.overallScore
  }

  public getMetrics(): {
    problemClarity: number
    targetAudienceClarity: number
    scopeDefinition: number
    valuePropositionClarity: number
  } {
    return { ...this.metrics }
  }

  private static validateInteger(value: number, fieldName: string): void {
    if (!Number.isInteger(value)) {
      throw new Error(`${fieldName} must be an integer`)
    }
  }

  private static validateRange(value: number, fieldName: string): void {
    if (value < 0 || value > 10) {
      throw new Error(`${fieldName} must be between 0 and 10`)
    }
  }
}
