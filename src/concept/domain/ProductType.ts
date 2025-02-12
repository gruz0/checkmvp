import { ArrayValueObject } from '@/common/domain/ArrayValueObject'

export class ProductType extends ArrayValueObject<
  typeof ProductType.VALID_PRODUCT_TYPES
> {
  private static readonly VALID_PRODUCT_TYPES = [
    'b2b',
    'b2c',
    'b2b2c',
    'saas',
    'marketplace',
  ] as const

  private constructor(value: (typeof ProductType.VALID_PRODUCT_TYPES)[number]) {
    super(value)
  }

  static New(value: string): ProductType {
    const validValue = ArrayValueObject.createNew(
      value,
      ProductType.VALID_PRODUCT_TYPES,
      'Product type'
    )
    return new ProductType(validValue)
  }
}
