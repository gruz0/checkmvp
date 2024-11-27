export class ElevatorPitch {
  private constructor(
    private readonly hook: string,
    private readonly problem: string,
    private readonly solution: string,
    private readonly valueProposition: string,
    private readonly cta: string
  ) {}

  static New(
    hook: string,
    problem: string,
    solution: string,
    valueProposition: string,
    cta: string
  ): ElevatorPitch {
    if (!hook || hook.trim() === '') {
      throw new Error('Hook cannot be empty')
    }

    if (!problem || problem.trim() === '') {
      throw new Error('Problem cannot be empty')
    }

    if (!solution || solution.trim() === '') {
      throw new Error('Solution cannot be empty')
    }

    if (!valueProposition || valueProposition.trim() === '') {
      throw new Error('Value proposition cannot be empty')
    }

    if (!cta || cta.trim() === '') {
      throw new Error('Call to action cannot be empty')
    }

    return new ElevatorPitch(
      hook.trim(),
      problem.trim(),
      solution.trim(),
      valueProposition.trim(),
      cta.trim()
    )
  }

  public getHook(): string {
    return this.hook
  }

  public getProblem(): string {
    return this.problem
  }

  public getSolution(): string {
    return this.solution
  }

  public getValueProposition(): string {
    return this.valueProposition
  }

  public getCTA(): string {
    return this.cta
  }
}
