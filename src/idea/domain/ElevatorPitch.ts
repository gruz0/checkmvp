export class ElevatorPitch {
  private readonly hook: string
  private readonly problem: string
  private readonly solution: string
  private readonly valueProposition: string
  private readonly cta: string

  private constructor(
    hook: string,
    problem: string,
    solution: string,
    valueProposition: string,
    cta: string
  ) {
    this.hook = hook
    this.problem = problem
    this.solution = solution
    this.valueProposition = valueProposition
    this.cta = cta
  }

  static New(
    hook: string,
    problem: string,
    solution: string,
    valueProposition: string,
    cta: string
  ): ElevatorPitch {
    return new ElevatorPitch(hook, problem, solution, valueProposition, cta)
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
