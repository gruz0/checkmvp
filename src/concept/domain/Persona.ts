export class Persona {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static New(value: string): Persona {
    const cleanValue = value.trim()

    if (!cleanValue || cleanValue.length < 64 || cleanValue.length > 2048) {
      throw new Error(
        'Personas must be defined and between 64 and 2048 characters.'
      )
    }

    return new Persona(cleanValue)
  }

  public getValue(): string {
    return this.value
  }
}
