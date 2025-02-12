export class Problem {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static New(value: string): Problem {
    const cleanValue = value.trim()

    if (!cleanValue || cleanValue.length < 64 || cleanValue.length > 2048) {
      throw new Error(
        'Problem must be defined and between 64 and 2048 characters.'
      )
    }

    return new Problem(cleanValue)
  }

  public getValue(): string {
    return this.value
  }
}
