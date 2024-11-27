export class ValueProposition {
  private constructor(
    private readonly mainBenefit: string,
    private readonly problemSolving: string,
    private readonly differentiation: string
  ) {}

  static New(
    mainBenefit: string,
    problemSolving: string,
    differentiation: string
  ): ValueProposition {
    if (!mainBenefit || mainBenefit.trim() === '') {
      throw new Error('Main benefit cannot be empty')
    }

    if (!problemSolving || problemSolving.trim() === '') {
      throw new Error('Problem solving cannot be empty')
    }

    if (!differentiation || differentiation.trim() === '') {
      throw new Error('Differentiation cannot be empty')
    }

    return new ValueProposition(
      mainBenefit.trim(),
      problemSolving.trim(),
      differentiation.trim()
    )
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
