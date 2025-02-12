export class HypothesisFramework {
  private constructor(
    private readonly statement: string,
    private readonly hypotheses: string[]
  ) {}

  public static New(
    statement: string,
    hypotheses: string[]
  ): HypothesisFramework {
    if (!statement.trim()) {
      throw new Error('Statement must not be empty')
    }

    if (hypotheses.length === 0) {
      throw new Error('Hypotheses must not be empty')
    }

    if (hypotheses.some((hypothesis) => !hypothesis.trim())) {
      throw new Error('Hypotheses must not contain empty values')
    }

    return new HypothesisFramework(
      statement.trim(),
      hypotheses.map((h) => h.trim())
    )
  }

  public getStatement(): string {
    return this.statement
  }

  public getHypotheses(): string[] {
    return [...this.hypotheses]
  }
}
