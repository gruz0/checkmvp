import { Identity } from '@/shared/Identity'

export class TargetAudience {
  private readonly id: Identity
  private readonly ideaId: Identity
  private readonly segment: string
  private readonly description: string
  private readonly challenges: string[]

  private why: string | null = null
  private painPoints: string[] | null = null
  private targetingStrategy: string | null = null

  private constructor(
    id: Identity,
    ideaId: Identity,
    segment: string,
    description: string,
    challenges: string[]
  ) {
    this.id = id
    this.ideaId = ideaId
    this.segment = segment
    this.description = description
    this.challenges = challenges
  }

  static New(
    id: string,
    ideaId: string,
    segment: string,
    description: string,
    challenges: string[]
  ): TargetAudience {
    return new TargetAudience(
      Identity.New(id),
      Identity.New(ideaId),
      segment,
      description,
      challenges
    )
  }

  public setWhy(why: string): void {
    if (!why) {
      throw new Error('Why cannot be empty')
    }

    this.why = why
  }

  public setPainPoints(painPoints: string[]): void {
    if (painPoints.length === 0) {
      throw new Error('Pain points cannot be empty')
    }

    this.painPoints = painPoints
  }

  public setTargetingStrategy(targetingStrategy: string): void {
    if (!targetingStrategy) {
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