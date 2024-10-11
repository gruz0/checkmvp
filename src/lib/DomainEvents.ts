export interface DomainEvent {
  occurredAt: Date
  getEventName(): string
}

export class IdeaCreatedEvent implements DomainEvent {
  occurredAt: Date
  ideaId: string

  constructor(ideaId: string) {
    this.occurredAt = new Date()
    this.ideaId = ideaId
  }

  getEventName(): string {
    return 'IdeaCreated'
  }
}

export class ProblemEvaluatedEvent implements DomainEvent {
  occurredAt: Date
  ideaId: string

  constructor(ideaId: string) {
    this.occurredAt = new Date()
    this.ideaId = ideaId
  }

  getEventName(): string {
    return 'ProblemEvaluated'
  }
}

export class ContentAndLongTermStrategyEvaluatedEvent implements DomainEvent {
  occurredAt: Date
  ideaId: string

  constructor(ideaId: string) {
    this.occurredAt = new Date()
    this.ideaId = ideaId
  }

  getEventName(): string {
    return 'ContentAndLongTermStrategyEvaluated'
  }
}

export class UserAcquisitionAndCompetitorAnalysisEvaluatedEvent
  implements DomainEvent
{
  occurredAt: Date
  ideaId: string

  constructor(ideaId: string) {
    this.occurredAt = new Date()
    this.ideaId = ideaId
  }

  getEventName(): string {
    return 'UserAcquisitionAndCompetitorAnalysisEvaluated'
  }
}

export class ContentStrategyAndGrowthPlanEvaluatedEvent implements DomainEvent {
  occurredAt: Date
  ideaId: string

  constructor(ideaId: string) {
    this.occurredAt = new Date()
    this.ideaId = ideaId
  }

  getEventName(): string {
    return 'ContentStrategyAndGrowthPlanEvaluated'
  }
}
