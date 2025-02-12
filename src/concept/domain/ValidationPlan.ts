export class ValidationPlan {
  private constructor(
    private readonly quickWins: string[],
    private readonly mediumEffort: string[],
    private readonly deepDive: string[],
    private readonly successCriteria: string[]
  ) {}

  public static New(
    quickWins: string[],
    mediumEffort: string[],
    deepDive: string[],
    successCriteria: string[]
  ): ValidationPlan {
    if (quickWins.length === 0) {
      throw new Error('Quick wins must not be empty')
    }

    if (quickWins.some((win) => !win.trim())) {
      throw new Error('Quick wins must not contain empty values')
    }

    if (mediumEffort.length === 0) {
      throw new Error('Medium effort tasks must not be empty')
    }

    if (mediumEffort.some((task) => !task.trim())) {
      throw new Error('Medium effort tasks must not contain empty values')
    }

    if (deepDive.length === 0) {
      throw new Error('Deep dive tasks must not be empty')
    }

    if (deepDive.some((task) => !task.trim())) {
      throw new Error('Deep dive tasks must not contain empty values')
    }

    if (successCriteria.length === 0) {
      throw new Error('Success criteria must not be empty')
    }

    if (successCriteria.some((criteria) => !criteria.trim())) {
      throw new Error('Success criteria must not contain empty values')
    }

    return new ValidationPlan(
      quickWins.map((w) => w.trim()),
      mediumEffort.map((m) => m.trim()),
      deepDive.map((d) => d.trim()),
      successCriteria.map((c) => c.trim())
    )
  }

  public getQuickWins(): string[] {
    return [...this.quickWins]
  }

  public getMediumEffort(): string[] {
    return [...this.mediumEffort]
  }

  public getDeepDive(): string[] {
    return [...this.deepDive]
  }

  public getSuccessCriteria(): string[] {
    return [...this.successCriteria]
  }
}
