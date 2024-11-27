export class Problem {
  private constructor(private readonly value: string) {}

  static New(value: string): Problem {
    if (typeof value !== 'string') {
      throw new Error('Problem must be a string.')
    }

    const cleanValue = value.trim()

    if (cleanValue === '') {
      throw new Error('Problem cannot be empty.')
    }

    if (cleanValue.length < 30 || cleanValue.length > 2048) {
      throw new Error('Problem must be between 30 and 2048 characters.')
    }

    return new Problem(cleanValue)
  }

  public getValue(): string {
    return this.value
  }
}
