export class Identity {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static New(value: string): Identity {
    if (value.trim() === '') {
      throw new Error('Value must be defined and non-empty')
    }

    return new Identity(value)
  }

  getValue(): string {
    return this.value
  }
}
