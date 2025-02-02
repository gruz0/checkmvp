import { Identity } from '@/common/domain/Identity'

export class TargetAudience {
  private why: string | null = null
  private painPoints: string[] | null = null
  private targetingStrategy: string | null = null

  private constructor(
    private readonly id: Identity,
    private readonly ideaId: Identity,
    private readonly segment: string,
    private readonly description: string,
    private readonly challenges: string[]
  ) {}

  static New(
    id: string,
    ideaId: string,
    segment: string,
    description: string,
    challenges: string[]
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

    return new TargetAudience(
      Identity.New(id),
      Identity.New(ideaId),
      segment.trim(),
      description.trim(),
      challenges
    )
  }

  public setWhy(why: string): void {
    if (!why || why.trim() === '') {
      throw new Error('Why cannot be empty')
    }

    this.why = why
  }

  public setPainPoints(painPoints: string[]): void {
    if (!Array.isArray(painPoints) || painPoints.length === 0) {
      throw new Error('Pain points cannot be empty')
    }

    this.painPoints = painPoints
  }

  public setTargetingStrategy(targetingStrategy: string): void {
    if (!targetingStrategy || targetingStrategy.trim() === '') {
      throw new Error('Targeting strategy cannot be empty')
    }

    this.targetingStrategy = targetingStrategy
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

  public getWhy(): string | null {
    return this.why
  }

  public getPainPoints(): string[] | null {
    return this.painPoints
  }

  public getTargetingStrategy(): string | null {
    return this.targetingStrategy
  }
}
