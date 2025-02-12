import { ArrayValueObject } from '@/common/domain/ArrayValueObject'

export class Region extends ArrayValueObject<typeof Region.VALID_REGIONS> {
  private static readonly VALID_REGIONS = [
    'worldwide',
    'north_america',
    'south_america',
    'europe',
    'asia',
    'africa',
    'oceania',
  ] as const

  private constructor(value: (typeof Region.VALID_REGIONS)[number]) {
    super(value)
  }

  static New(value: string): Region {
    const validValue = ArrayValueObject.createNew(
      value,
      Region.VALID_REGIONS,
      'Region'
    )
    return new Region(validValue)
  }
}
