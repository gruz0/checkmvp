import { Problem } from '@/concept/domain/Problem'
import { Identity } from '@/shared/Identity'
import { Evaluation } from './Evaluation'

export class Concept {
  private readonly expiryPeriodInDays = 3
  private readonly id: Identity
  private readonly problem: Problem
  private readonly createdAt: Date

  private evaluation: Evaluation | null = null
  private accepted: boolean = false
  private ideaId: Identity | null = null
  private archived: boolean = false

  private constructor(id: Identity, problem: Problem, createdAt: Date) {
    this.id = id
    this.problem = problem
    this.createdAt = createdAt
  }

  static New(id: string, problem: string, createdAt?: Date): Concept {
    return new Concept(
      Identity.New(id),
      Problem.New(problem),
      createdAt ?? new Date()
    )
  }

  public isAvailable(): boolean {
    if (this.isArchived()) {
      return false
    }

    const availabilityDuration = this.expiryPeriodInDays * 24 * 60 * 60 * 1000
    const now = new Date()
    return now.getTime() - this.createdAt.getTime() < availabilityDuration
  }

  public evaluate(evaluation: Evaluation): void {
    this.evaluation = evaluation
  }

  public accept(ideaId: string): void {
    const identity = Identity.New(ideaId)

    if (this.accepted) {
      throw new Error('Concept was accepted')
    }

    if (this.archived) {
      throw new Error('Concept was archived')
    }

    this.accepted = true
    this.ideaId = identity
  }

  public archive(): void {
    if (!this.accepted) {
      throw new Error('Concept was not accepted')
    }

    if (this.archived) {
      throw new Error('Concept was archived')
    }

    this.archived = true
  }

  public getId(): Identity {
    return this.id
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getProblem(): Problem {
    return this.problem
  }

  public getEvaluation(): Evaluation | null {
    return this.evaluation
  }

  public getIdeaId(): Identity | null {
    return this.ideaId
  }

  public isEvaluated(): boolean {
    return this.evaluation != null
  }

  public isAccepted(): boolean {
    return this.accepted
  }

  public isArchived(): boolean {
    return this.archived
  }
}
