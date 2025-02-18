import { Identity } from '@/common/domain/Identity'

export class TargetAudience {
  private constructor(
    private readonly id: Identity,
    private readonly ideaId: Identity,
    private readonly segment: string,
    private readonly description: string,
    private readonly challenges: string[],
    private readonly why: string,
    private readonly painPoints: string[],
    private readonly targetingStrategy: string
  ) {}

  static New(
    id: string,
    ideaId: string,
    segment: string,
    description: string,
    challenges: string[],
    why: string,
    painPoints: string[],
    targetingStrategy: string
  ): TargetAudience {
    if (!segment || segment.trim() === '') {
      throw new Error('Segment cannot be empty')
    }

    if (!description || description.trim() === '') {
      throw new Error('Description cannot be empty')
    }

    if (!Array.isArray(challenges) || challenges.length === 0) {
      throw new Error('Challenges cannot be empty')
    }

    if (challenges.some((challenge) => !challenge || challenge.trim() === '')) {
      throw new Error('Challenges cannot contain empty strings')
    }

    if (!why || why.trim() === '') {
      throw new Error('Why cannot be empty')
    }

    if (!Array.isArray(painPoints) || painPoints.length === 0) {
      throw new Error('Pain points cannot be empty')
    }

    if (painPoints.some((painPoint) => !painPoint || painPoint.trim() === '')) {
      throw new Error('Pain points cannot contain empty strings')
    }

    if (!targetingStrategy || targetingStrategy.trim() === '') {
      throw new Error('Targeting strategy cannot be empty')
    }

    return new TargetAudience(
      Identity.New(id),
      Identity.New(ideaId),
      segment.trim(),
      description.trim(),
      challenges,
      why.trim(),
      painPoints,
      targetingStrategy
    )
  }

  public getId(): Identity {
    return this.id
  }

  public getIdeaId(): Identity {
    return this.ideaId
  }

  public getSegment(): string {
    return this.segment
  }

  public getDescription(): string {
    return this.description
  }

  public getChallenges(): string[] {
    return this.challenges
  }

  public getWhy(): string {
    return this.why
  }

  public getPainPoints(): string[] {
    return this.painPoints
  }

  public getTargetingStrategy(): string {
    return this.targetingStrategy
  }
}
