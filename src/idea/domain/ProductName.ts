export class ProductName {
  private readonly productName: string
  private readonly domains: string[]
  private readonly why: string
  private readonly tagline: string
  private readonly targetAudienceInsight: string
  private readonly similarNames: string[]
  private readonly brandingPotential: string

  private constructor(
    productName: string,
    domains: string[],
    why: string,
    tagline: string,
    targetAudienceInsight: string,
    similarNames: string[],
    brandingPotential: string
  ) {
    this.productName = productName
    this.domains = domains
    this.why = why
    this.tagline = tagline
    this.targetAudienceInsight = targetAudienceInsight
    this.similarNames = similarNames
    this.brandingPotential = brandingPotential
  }

  static New(
    productName: string,
    domains: string[],
    why: string,
    tagline: string,
    targetAudienceInsight: string,
    similarNames: string[],
    brandingPotential: string
  ): ProductName {
    return new ProductName(
      productName,
      domains,
      why,
      tagline,
      targetAudienceInsight,
      similarNames,
      brandingPotential
    )
  }

  public getProductName(): string {
    return this.productName
  }

  public getDomains(): string[] {
    return this.domains
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
    return this.similarNames
  }

  public getBrandingPotential(): string {
    return this.brandingPotential
  }
}
