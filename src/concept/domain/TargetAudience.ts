import { ValidationMetrics } from './ValidationMetrics'

export class TargetAudience {
  private constructor(
    private readonly id: string,
    private readonly segment: string,
    private readonly description: string,
    private readonly challenges: string[],
    private readonly why: string,
    private readonly painPoints: string[],
    private readonly targetingStrategy: string,
    private readonly statement: string,
    private readonly hypotheses: string[],
    private readonly validationMetrics: ValidationMetrics
  ) {}

  public static New(
    id: string,
    segment: string,
    description: string,
    challenges: string[],
    why: string,
    painPoints: string[],
    targetingStrategy: string,
    statement: string,
    hypotheses: string[],
    validationMetrics: ValidationMetrics
  ): TargetAudience {
    const cleanId = id.trim()
    const cleanSegment = segment.trim()
    const cleanDescription = description.trim()
    const cleanChallenges = challenges.map((challenge) => challenge.trim())
    const cleanWhy = why.trim()
    const cleanPainPoints = painPoints.map((painPoint) => painPoint.trim())
    const cleanTargetingStrategy = targetingStrategy.trim()
    const cleanStatement = statement.trim()
    const cleanHypotheses = hypotheses.map((hypothesis) => hypothesis.trim())

    if (!cleanId) {
      throw new Error('Id must not be empty')
    }

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

    if (!cleanWhy) {
      throw new Error('Why must not be empty')
    }

    if (cleanPainPoints.length === 0) {
      throw new Error('At least one pain point must be provided')
    }

    if (cleanPainPoints.some((painPoint) => !painPoint)) {
      throw new Error('Pain points must not be empty')
    }

    if (!cleanTargetingStrategy) {
      throw new Error('Targeting strategy must not be empty')
    }

    if (!cleanStatement) {
      throw new Error('Statement must not be empty')
    }

    if (cleanHypotheses.length === 0) {
      throw new Error('At least one hypothesis must be provided')
    }

    if (cleanHypotheses.some((hypothesis) => !hypothesis)) {
      throw new Error('Hypotheses must not be empty')
    }

    return new TargetAudience(
      cleanId,
      cleanSegment,
      cleanDescription,
      cleanChallenges,
      cleanWhy,
      cleanPainPoints,
      cleanTargetingStrategy,
      cleanStatement,
      cleanHypotheses,
      validationMetrics
    )
  }

  public getId(): string {
    return this.id
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

  public getWhy(): string {
    return this.why
  }

  public getPainPoints(): string[] {
    return [...this.painPoints]
  }

  public getTargetingStrategy(): string {
    return this.targetingStrategy
  }

  public getStatement(): string {
    return this.statement
  }

  public getHypotheses(): string[] {
    return [...this.hypotheses]
  }

  public getValidationMetrics(): ValidationMetrics {
    return this.validationMetrics
  }
}
