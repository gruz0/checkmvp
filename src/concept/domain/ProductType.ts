export class ProductType {
  private readonly value: string
  private static readonly VALID_PRODUCT_TYPES = [
    'b2b',
    'b2c',
    'b2b2c',
    'saas',
    'marketplace',
  ] as const

  private constructor(value: string) {
    this.value = value
  }

  static New(value: string): ProductType {
    if (!value) {
      throw new Error('Product type must be defined.')
    }

    const cleanValue = value
      .trim()
      .toLowerCase() as (typeof ProductType.VALID_PRODUCT_TYPES)[number]

    if (!cleanValue) {
      throw new Error('Product type must be defined.')
    }

    if (!this.VALID_PRODUCT_TYPES.includes(cleanValue)) {
      throw new Error(
        `Invalid product type. Must be one of: ${this.VALID_PRODUCT_TYPES.join(
          ', '
        )}`
      )
    }

    return new ProductType(cleanValue)
  }

  public getValue(): string {
    return this.value
  }
}
