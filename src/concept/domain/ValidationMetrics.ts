export class ValidationMetrics {
  private constructor(
    private readonly marketSize: string,
    private readonly accessibility: number,
    private readonly painPointIntensity: number,
    private readonly willingnessToPay: number
  ) {}

  public static New(
    marketSize: string,
    accessibility: number,
    painPointIntensity: number,
    willingnessToPay: number
  ): ValidationMetrics {
    const cleanMarketSize = marketSize.trim()

    if (!cleanMarketSize) {
      throw new Error('Market size must not be empty')
    }

    this.validateMetricRange('Accessibility', accessibility)
    this.validateMetricRange('Pain point intensity', painPointIntensity)
    this.validateMetricRange('Willingness to pay', willingnessToPay)

    return new ValidationMetrics(
      cleanMarketSize,
      accessibility,
      painPointIntensity,
      willingnessToPay
    )
  }

  private static validateMetricRange(name: string, value: number): void {
    if (value < 0 || value > 10 || !Number.isInteger(value)) {
      throw new Error(`${name} must be an integer between 0 and 10`)
    }
  }

  public getMarketSize(): string {
    return this.marketSize
  }

  public getAccessibility(): number {
    return this.accessibility
  }

  public getPainPointIntensity(): number {
    return this.painPointIntensity
  }

  public getWillingnessToPay(): number {
    return this.willingnessToPay
  }
}
