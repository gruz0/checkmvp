import { TimeProvider } from '@/common/domain/TimeProvider'
import { Evaluation } from '@/concept/domain/Evaluation'
import { Problem } from '@/concept/domain/Problem'
import { Region } from '@/concept/domain/Region'
import { Identity } from '@/shared/Identity'

enum ConceptState {
  DRAFT = 'draft',
  EVALUATED = 'evaluated',
  ACCEPTED = 'accepted',
  ARCHIVED = 'archived',
  ANONYMIZED = 'anonymized',
}

export class Concept {
  private static readonly MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

  private static readonly STATE_TRANSITIONS: Record<
    ConceptState,
    ConceptState[]
  > = {
    [ConceptState.DRAFT]: [ConceptState.EVALUATED, ConceptState.ANONYMIZED],
    [ConceptState.EVALUATED]: [ConceptState.ACCEPTED, ConceptState.ANONYMIZED],
    [ConceptState.ACCEPTED]: [ConceptState.ARCHIVED, ConceptState.ANONYMIZED],
    [ConceptState.ARCHIVED]: [ConceptState.ANONYMIZED],
    [ConceptState.ANONYMIZED]: [], // Terminal state
  } as const

  private state: ConceptState = ConceptState.DRAFT

  private problem: Problem
  private ideaId: Identity | null = null
  private evaluation: Evaluation | null = null

  // We should keep track of the state changes to be able to
  // properly update the database.
  private evaluated: boolean = false
  private accepted: boolean = false
  private archived: boolean = false
  private anonymized: boolean = false

  private constructor(
    private readonly id: Identity,
    problem: Problem,
    private readonly region: Region,
    private readonly createdAt: Date,
    private readonly expiryPeriodInDays: number,
    private readonly timeProvider: TimeProvider
  ) {
    this.problem = problem
  }

  static New(
    id: string,
    problem: string,
    region: string,
    expiryPeriodInDays: number,
    timeProvider: TimeProvider,
    createdAt?: Date
  ): Concept {
    if (expiryPeriodInDays <= 0) {
      throw new Error('Expiry period must be positive')
    }

    if (createdAt && createdAt.getTime() > timeProvider.now().getTime()) {
      throw new Error('Creation date cannot be in the future')
    }

    return new Concept(
      Identity.New(id),
      Problem.New(problem),
      Region.New(region),
      createdAt ?? new Date(),
      expiryPeriodInDays,
      timeProvider
    )
  }

  // TODO: It would be better to rename this method to something like
  // explaining that the concept is available for the user to see.
  // Maybe it should be called isAvailableForViewing()
  public isAvailable(): boolean {
    if (this.isArchived()) {
      return false
    }

    if (this.isAnonymized()) {
      return false
    }

    const availabilityDuration =
      this.expiryPeriodInDays * Concept.MILLISECONDS_PER_DAY
    return this.calculateAge() < availabilityDuration
  }

  public evaluate(evaluation: Evaluation): void {
    this.validateTransition(ConceptState.EVALUATED)

    this.evaluation = evaluation
    this.state = ConceptState.EVALUATED
    this.evaluated = true
  }

  public accept(ideaId: Identity): void {
    this.validateTransition(ConceptState.ACCEPTED)

    this.ideaId = ideaId
    this.state = ConceptState.ACCEPTED
    this.accepted = true
  }

  public archive(): void {
    this.validateTransition(ConceptState.ARCHIVED)

    this.state = ConceptState.ARCHIVED
    this.archived = true
  }

  public anonymize(): void {
    this.validateTransition(ConceptState.ANONYMIZED)

    this.state = ConceptState.ANONYMIZED
    this.anonymized = true
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

  public getRegion(): Region {
    return this.region
  }

  public getEvaluation(): Evaluation {
    if (!this.evaluation) {
      throw new Error('Concept has not been evaluated yet')
    }

    return this.evaluation
  }

  public getIdeaId(): Identity {
    if (!this.ideaId) {
      throw new Error('Concept has not been accepted yet')
    }

    return this.ideaId
  }

  public getExpiryPeriodInDays(): number {
    return this.expiryPeriodInDays
  }

  public getTimeProvider(): TimeProvider {
    return this.timeProvider
  }

  public isEvaluated(): boolean {
    return this.state === ConceptState.EVALUATED
  }

  public isAccepted(): boolean {
    return this.state === ConceptState.ACCEPTED
  }

  public isArchived(): boolean {
    return this.state === ConceptState.ARCHIVED
  }

  public isAnonymized(): boolean {
    return this.state === ConceptState.ANONYMIZED
  }

  public wasEvaluated(): boolean {
    return this.evaluated
  }

  public wasAccepted(): boolean {
    return this.accepted
  }

  public wasArchived(): boolean {
    return this.archived
  }

  public wasAnonymized(): boolean {
    return this.anonymized
  }

  private validateTransition(newState: ConceptState): void {
    const validTransitions = Concept.STATE_TRANSITIONS[this.state]

    if (!validTransitions.includes(newState)) {
      throw new Error(
        `Invalid state transition from ${this.state} to ${newState}`
      )
    }
  }

  private calculateAge(): number {
    return this.timeProvider.now().getTime() - this.createdAt.getTime()
  }
}
