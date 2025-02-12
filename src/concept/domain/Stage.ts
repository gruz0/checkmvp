import { ArrayValueObject } from '@/common/domain/ArrayValueObject'

export class Stage extends ArrayValueObject<typeof Stage.VALID_STAGES> {
  private static readonly VALID_STAGES = [
    'idea',
    'pre_mvp',
    'mvp',
    'post_launch',
  ] as const

  private constructor(value: (typeof Stage.VALID_STAGES)[number]) {
    super(value)
  }

  static New(value: string): Stage {
    const validValue = ArrayValueObject.createNew(
      value,
      Stage.VALID_STAGES,
      'Stage'
    )
    return new Stage(validValue)
  }
}
