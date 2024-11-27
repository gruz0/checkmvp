export class Competitor {
  private constructor(
    private readonly name: string,
    private readonly productName: string,
    private readonly url: string,
    private readonly coreFeatures: string[],
    private readonly valueProposition: string,
    private readonly userAcquisition: string,
    private readonly strengths: string[],
    private readonly weaknesses: string[],
    private readonly differentiationOpportunity: string
  ) {}

  static New(
    name: string,
    productName: string,
    url: string,
    coreFeatures: string[],
    valueProposition: string,
    userAcquisition: string,
    strengths: string[],
    weaknesses: string[],
    differentiationOpportunity: string
  ) {
    if (!name || name.trim() === '') {
      throw new Error('Competitor name cannot be empty')
    }

    if (!productName || productName.trim() === '') {
      throw new Error('Product name cannot be empty')
    }

    if (!url || url.trim() === '') {
      throw new Error('URL cannot be empty')
    }

    const urlPattern = /^(http|https):\/\/[^ "]+$/
    if (!urlPattern.test(url)) {
      throw new Error('URL is not valid')
    }

    if (!Array.isArray(coreFeatures) || coreFeatures.length === 0) {
      throw new Error('Core features cannot be empty')
    }

    if (!valueProposition || valueProposition.trim() === '') {
      throw new Error('Value proposition cannot be empty')
    }

    if (!userAcquisition || userAcquisition.trim() === '') {
      throw new Error('User acquisition cannot be empty')
    }

    if (!Array.isArray(strengths) || strengths.length === 0) {
      throw new Error('Strengths cannot be empty')
    }

    if (!Array.isArray(weaknesses) || weaknesses.length === 0) {
      throw new Error('Weaknesses cannot be empty')
    }

    if (
      !differentiationOpportunity ||
      differentiationOpportunity.trim() === ''
    ) {
      throw new Error('Differentiation opportunity cannot be empty')
    }

    return new Competitor(
      name.trim(),
      productName.trim(),
      url.trim(),
      coreFeatures,
      valueProposition.trim(),
      userAcquisition.trim(),
      strengths,
      weaknesses,
      differentiationOpportunity.trim()
    )
  }

  public getName(): string {
    return this.name
  }

  public getProductName(): string {
    return this.productName
  }

  public getUrl(): string {
    return this.url
  }

  public getCoreFeatures(): string[] {
    return [...this.coreFeatures]
  }

  public getValueProposition(): string {
    return this.valueProposition
  }

  public getUserAcquisition(): string {
    return this.userAcquisition
  }

  public getStrengths(): string[] {
    return [...this.strengths]
  }

  public getWeaknesses(): string[] {
    return [...this.weaknesses]
  }

  public getDifferentiationOpportunity(): string {
    return this.differentiationOpportunity
  }
}
