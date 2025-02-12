export class Stage {
  private readonly value: string
  private static readonly VALID_STAGES = [
    'idea',
    'pre_mvp',
    'mvp',
    'post_launch',
  ] as const

  private constructor(value: string) {
    this.value = value
  }

  static New(value: string): Stage {
    if (!value) {
      throw new Error('Stage must be defined.')
    }

    const cleanValue = value
      .trim()
      .toLowerCase() as (typeof Stage.VALID_STAGES)[number]

    if (!cleanValue) {
      throw new Error('Stage must be defined.')
    }

    if (!this.VALID_STAGES.includes(cleanValue)) {
      throw new Error(
        `Invalid stage. Must be one of: ${this.VALID_STAGES.join(', ')}`
      )
    }

    return new Stage(cleanValue)
  }

  public getValue(): string {
    return this.value
  }
}
