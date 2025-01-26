export class Region {
  private readonly value: string
  private static readonly VALID_REGIONS = [
    'worldwide',
    'north_america',
    'south_america',
    'europe',
    'asia',
    'africa',
    'oceania',
  ] as const

  private constructor(value: string) {
    this.value = value
  }

  static New(value: string): Region {
    if (!value) {
      throw new Error('Region must be defined.')
    }

    const cleanValue = value
      .trim()
      .toLowerCase() as (typeof Region.VALID_REGIONS)[number]

    if (!cleanValue) {
      throw new Error('Region must be defined.')
    }

    if (!this.VALID_REGIONS.includes(cleanValue)) {
      throw new Error(
        `Invalid region. Must be one of: ${this.VALID_REGIONS.join(', ')}`
      )
    }

    return new Region(cleanValue)
  }

  public getValue(): string {
    return this.value
  }
}
