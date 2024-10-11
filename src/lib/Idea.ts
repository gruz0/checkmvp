import { v4 as uuidv4 } from 'uuid'
import type { ContentAndLongTermStrategyEvaluation } from '@/lib/ContentAndLongTermStrategyEvaluation'
import type { ContentStrategyAndGrowthPlan } from '@/lib/ContentStrategyAndGrowthPlan'
import {
  ContentAndLongTermStrategyEvaluatedEvent,
  ContentStrategyAndGrowthPlanEvaluatedEvent,
  DomainEvent,
  IdeaCreatedEvent,
  ProblemEvaluatedEvent,
  UserAcquisitionAndCompetitorAnalysisEvaluatedEvent,
} from '@/lib/DomainEvents'
import type { ProblemEvaluation } from '@/lib/ProblemEvaluation'
import type { TargetAudienceEvaluation } from '@/lib/TargetAudienceEvaluation'
import type { UserAcquisitionAndCompetitorAnalysis } from '@/lib/UserAcquisitionAndCompetitorAnalysis'

export class Idea {
  private readonly id: string
  private readonly initialProblem: string
  private readonly initialTargetAudience: string

  private problemEvaluation: ProblemEvaluation | null
  private targetAudienceEvaluation: TargetAudienceEvaluation | null
  private contentAndLongTermStrategyEvaluation: ContentAndLongTermStrategyEvaluation | null
  private userAcquisitionAndCompetitorAnalysis: UserAcquisitionAndCompetitorAnalysis | null
  private contentStrategyAndGrowthPlan: ContentStrategyAndGrowthPlan | null

  private domainEvents: DomainEvent[] = []

  private constructor(
    initialProblem: string,
    initialTargetAudience: string,
    id: string | null,
    problemEvaluation: ProblemEvaluation | null,
    targetAudienceEvaluation: TargetAudienceEvaluation | null,
    contentAndLongTermStrategyEvaluation: ContentAndLongTermStrategyEvaluation | null,
    userAcquisitionAndCompetitorAnalysis: UserAcquisitionAndCompetitorAnalysis | null,
    contentStrategyAndGrowthPlan: ContentStrategyAndGrowthPlan | null
  ) {
    // Generate a new ID if not provided
    const generatedId = id ?? uuidv4()

    if (!id) {
      this.addDomainEvent(new IdeaCreatedEvent(generatedId))
    }

    this.initialProblem = initialProblem
    this.initialTargetAudience = initialTargetAudience
    this.id = generatedId
    this.problemEvaluation = problemEvaluation
    this.targetAudienceEvaluation = targetAudienceEvaluation
    this.contentAndLongTermStrategyEvaluation =
      contentAndLongTermStrategyEvaluation
    this.userAcquisitionAndCompetitorAnalysis =
      userAcquisitionAndCompetitorAnalysis
    this.contentStrategyAndGrowthPlan = contentStrategyAndGrowthPlan
  }

  static New(
    initialProblem: string,
    initialTargetAudience: string,
    id: string | null = null,
    problemEvaluation: ProblemEvaluation | null = null,
    targetAudienceEvaluation: TargetAudienceEvaluation | null = null,
    contentAndLongTermStrategyEvaluation: ContentAndLongTermStrategyEvaluation | null = null,
    userAcquisitionAndCompetitorAnalysis: UserAcquisitionAndCompetitorAnalysis | null = null,
    contentStrategyAndGrowthPlan: ContentStrategyAndGrowthPlan | null = null
  ): Idea {
    if (!initialProblem) {
      throw new Error('initialProblem must be defined and non-empty')
    }

    if (!initialTargetAudience) {
      throw new Error('initialTargetAudience must be defined and non-empty')
    }

    return new Idea(
      initialProblem,
      initialTargetAudience,
      id,
      problemEvaluation,
      targetAudienceEvaluation,
      contentAndLongTermStrategyEvaluation,
      userAcquisitionAndCompetitorAnalysis,
      contentStrategyAndGrowthPlan
    )
  }

  public getDomainEvents(): DomainEvent[] {
    return this.domainEvents
  }

  public clearDomainEvents(): void {
    this.domainEvents = []
  }

  public getId(): string {
    return this.id
  }

  public getInitialProblem(): string {
    return this.initialProblem
  }

  public getInitialTargetAudience(): string {
    return this.initialTargetAudience
  }

  public getProblemEvaluation(): ProblemEvaluation | null {
    return this.problemEvaluation
  }

  public getTargetAudienceEvaluation(): TargetAudienceEvaluation | null {
    return this.targetAudienceEvaluation
  }

  public getContentAndLongTermStrategyEvaluation(): ContentAndLongTermStrategyEvaluation | null {
    return this.contentAndLongTermStrategyEvaluation
  }

  public getUserAcquisitionAndCompetitorAnalysis(): UserAcquisitionAndCompetitorAnalysis | null {
    return this.userAcquisitionAndCompetitorAnalysis
  }

  public getContentStrategyAndGrowthPlan(): ContentStrategyAndGrowthPlan | null {
    return this.contentStrategyAndGrowthPlan
  }

  public evaluateProblemAndTargetAudience(
    problemEvaluation: ProblemEvaluation,
    targetAudienceEvaluation: TargetAudienceEvaluation
  ): void {
    if (this.problemEvaluation) {
      throw new Error(
        'Problem has already been evaluated and cannot be updated again.'
      )
    }

    this.problemEvaluation = problemEvaluation
    this.targetAudienceEvaluation = targetAudienceEvaluation

    // FIXME: Rename to ProblemAndTargetAudienceEvaluatedEvent
    this.addDomainEvent(new ProblemEvaluatedEvent(this.id))
  }

  public evaluateContentAndLongTermStrategy(
    contentAndLongTermStrategyEvaluation: ContentAndLongTermStrategyEvaluation
  ): void {
    this.contentAndLongTermStrategyEvaluation =
      contentAndLongTermStrategyEvaluation
    this.addDomainEvent(new ContentAndLongTermStrategyEvaluatedEvent(this.id))
  }

  public evaluateUserAcquisitionAndCompetitorAnalysis(
    userAcquisitionAndCompetitorAnalysis: UserAcquisitionAndCompetitorAnalysis
  ): void {
    this.userAcquisitionAndCompetitorAnalysis =
      userAcquisitionAndCompetitorAnalysis
    this.addDomainEvent(
      new UserAcquisitionAndCompetitorAnalysisEvaluatedEvent(this.id)
    )
  }

  public evaluateContentStrategyAndGrowthPlan(
    contentStrategyAndGrowthPlan: ContentStrategyAndGrowthPlan
  ): void {
    this.contentStrategyAndGrowthPlan = contentStrategyAndGrowthPlan
    this.addDomainEvent(new ContentStrategyAndGrowthPlanEvaluatedEvent(this.id))
  }

  public toJSON(): Record<string, unknown | null> {
    return {
      id: this.id,
      initialProblem: this.getInitialProblem(),
      initialTargetAudience: this.getInitialTargetAudience(),
      problemEvaluation: this.getProblemEvaluation(),
      targetAudienceEvaluation: this.getTargetAudienceEvaluation(),
      contentAndLongTermStrategyEvaluation:
        this.getContentAndLongTermStrategyEvaluation(),
      userAcquisitionAndCompetitorAnalysis:
        this.getUserAcquisitionAndCompetitorAnalysis(),
      contentStrategyAndGrowthPlan: this.getContentStrategyAndGrowthPlan(),
    }
  }

  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event)
  }
}
