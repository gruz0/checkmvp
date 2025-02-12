export abstract class ArrayValueObject<T extends readonly string[]> {
  protected readonly value: T[number]

  protected constructor(value: T[number]) {
    this.value = value
  }

  protected static createNew<V extends readonly string[]>(
    value: string,
    validValues: V,
    objectName: string
  ): V[number] {
    if (!value) {
      throw new Error(`${objectName} must be defined.`)
    }

    const cleanValue = value.trim().toLowerCase() as V[number]

    if (!cleanValue) {
      throw new Error(`${objectName} must be defined.`)
    }

    if (!validValues.includes(cleanValue)) {
      throw new Error(
        `Invalid ${objectName.toLowerCase()}. Must be one of: ${validValues.join(
          ', '
        )}`
      )
    }

    return cleanValue
  }

  public getValue(): string {
    return this.value
  }
}
