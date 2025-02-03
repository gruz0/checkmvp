import { ValidationMetrics } from './ValidationMetrics'

export class TargetAudience {
  private constructor(
    private readonly segment: string,
    private readonly description: string,
    private readonly challenges: string[],
    private readonly validationMetrics: ValidationMetrics
  ) {}

  public static New(
    segment: string,
    description: string,
    challenges: string[],
    validationMetrics: ValidationMetrics
  ): TargetAudience {
    const cleanSegment = segment.trim()
    const cleanDescription = description.trim()
    const cleanChallenges = challenges.map((challenge) => challenge.trim())

    if (!cleanSegment) {
      throw new Error('Segment must not be empty')
    }

    if (!cleanDescription) {
      throw new Error('Description must not be empty')
    }

    if (cleanChallenges.length === 0) {
      throw new Error('At least one challenge must be provided')
    }

    if (cleanChallenges.some((challenge) => !challenge)) {
      throw new Error('Challenges must not be empty')
    }

    return new TargetAudience(
      cleanSegment,
      cleanDescription,
      cleanChallenges,
      validationMetrics
    )
  }

  public getSegment(): string {
    return this.segment
  }

  public getDescription(): string {
    return this.description
  }

  public getChallenges(): string[] {
    return [...this.challenges]
  }

  public getValidationMetrics(): ValidationMetrics {
    return this.validationMetrics
  }
}
