export class AssumptionsAnalysis {
  private constructor(
    private readonly coreAssumptions: string[],
    private readonly testability: number,
    private readonly riskLevel: 'high' | 'medium' | 'low',
    private readonly validationMethods: string[]
  ) {}

  public static New(
    coreAssumptions: string[],
    testability: number,
    riskLevel: 'high' | 'medium' | 'low',
    validationMethods: string[]
  ): AssumptionsAnalysis {
    if (coreAssumptions.length === 0) {
      throw new Error('Core assumptions must not be empty')
    }

    if (coreAssumptions.some((assumption) => !assumption.trim())) {
      throw new Error('Core assumptions must not contain empty values')
    }

    if (testability < 0 || testability > 10 || !Number.isInteger(testability)) {
      throw new Error('Testability must be an integer between 0 and 10')
    }

    if (!['high', 'medium', 'low'].includes(riskLevel)) {
      throw new Error('Risk level must be high, medium, or low')
    }

    if (validationMethods.length === 0) {
      throw new Error('Validation methods must not be empty')
    }

    if (validationMethods.some((method) => !method.trim())) {
      throw new Error('Validation methods must not contain empty values')
    }

    return new AssumptionsAnalysis(
      coreAssumptions.map((a) => a.trim()),
      testability,
      riskLevel,
      validationMethods.map((m) => m.trim())
    )
  }

  public getCoreAssumptions(): string[] {
    return [...this.coreAssumptions]
  }

  public getTestability(): number {
    return this.testability
  }

  public getRiskLevel(): 'high' | 'medium' | 'low' {
    return this.riskLevel
  }

  public getValidationMethods(): string[] {
    return [...this.validationMethods]
  }
}
