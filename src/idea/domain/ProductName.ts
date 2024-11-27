export class ProductName {
  private constructor(
    private readonly productName: string,
    private readonly domains: string[],
    private readonly why: string,
    private readonly tagline: string,
    private readonly targetAudienceInsight: string,
    private readonly similarNames: string[],
    private readonly brandingPotential: string
  ) {}

  static New(
    productName: string,
    domains: string[],
    why: string,
    tagline: string,
    targetAudienceInsight: string,
    similarNames: string[],
    brandingPotential: string
  ): ProductName {
    if (!productName || productName.trim() === '') {
      throw new Error('Product name cannot be empty')
    }

    if (!Array.isArray(domains) || domains.length === 0) {
      throw new Error('Domains cannot be empty')
    }

    for (const domain of domains) {
      if (typeof domain !== 'string' || domain.trim() === '') {
        throw new Error('Each domain must be a non-empty string')
      }
    }

    if (!why || why.trim() === '') {
      throw new Error('Why cannot be empty')
    }

    if (!tagline || tagline.trim() === '') {
      throw new Error('Tagline cannot be empty')
    }

    if (!targetAudienceInsight || targetAudienceInsight.trim() === '') {
      throw new Error('Target audience insight cannot be empty')
    }

    if (!Array.isArray(similarNames) || similarNames.length === 0) {
      throw new Error('Similar names cannot be empty')
    }

    for (const name of similarNames) {
      if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('Each similar name must be a non-empty string')
      }
    }

    if (!brandingPotential || brandingPotential.trim() === '') {
      throw new Error('Branding potential cannot be empty')
    }

    return new ProductName(
      productName.trim(),
      domains.map((d) => d.trim()),
      why.trim(),
      tagline.trim(),
      targetAudienceInsight.trim(),
      similarNames.map((n) => n.trim()),
      brandingPotential.trim()
    )
  }

  public getProductName(): string {
    return this.productName
  }

  public getDomains(): string[] {
    return [...this.domains]
  }

  public getWhy(): string {
    return this.why
  }

  public getTagline(): string {
    return this.tagline
  }

  public getTargetAudienceInsight(): string {
    return this.targetAudienceInsight
  }

  public getSimilarNames(): string[] {
    return [...this.similarNames]
  }

  public getBrandingPotential(): string {
    return this.brandingPotential
  }
}
