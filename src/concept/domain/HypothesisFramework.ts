export class HypothesisFramework {
  private constructor(
    private readonly format: string,
    private readonly examples: string[]
  ) {}

  public static New(format: string, examples: string[]): HypothesisFramework {
    if (!format.trim()) {
      throw new Error('Format must not be empty')
    }

    if (examples.length === 0) {
      throw new Error('Examples must not be empty')
    }

    if (examples.some((example) => !example.trim())) {
      throw new Error('Examples must not contain empty values')
    }

    return new HypothesisFramework(
      format.trim(),
      examples.map((e) => e.trim())
    )
  }

  public getFormat(): string {
    return this.format
  }

  public getExamples(): string[] {
    return [...this.examples]
  }
}
