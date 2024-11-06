export class ValueProposition {
  private readonly mainBenefit: string
  private readonly problemSolving: string
  private readonly differentiation: string

  private constructor(
    mainBenefit: string,
    problemSolving: string,
    differentiation: string
  ) {
    this.mainBenefit = mainBenefit
    this.problemSolving = problemSolving
    this.differentiation = differentiation
  }

  static New(
    mainBenefit: string,
    problemSolving: string,
    differentiation: string
  ): ValueProposition {
    return new ValueProposition(mainBenefit, problemSolving, differentiation)
  }

  public getMainBenefit(): string {
    return this.mainBenefit
  }

  public getProblemSolving(): string {
    return this.problemSolving
  }

  public getDifferentiation(): string {
    return this.differentiation
  }
}
