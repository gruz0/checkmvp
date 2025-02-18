import * as Sentry from '@sentry/nextjs'
import { Identity } from '@/common/domain/Identity'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { EventBus } from '@/idea/events/EventBus'

interface ConceptForReservation {
  success: boolean
  message: string
  content?: {
    problem: string
    region: string
    productType: string
    stage: string
    marketExistence: string
    targetAudience: {
      id: string
      segment: string
      description: string
      challenges: string[]
      why: string
      painPoints: string[]
      targetingStrategy: string
      validationMetrics: {
        marketSize: string
        accessibility: number
        painPointIntensity: number
        willingnessToPay: number
      }
    }[]
  }
}

interface ConceptService {
  getConceptForReservation(conceptId: string): Promise<ConceptForReservation>
}

type Command = {
  ideaId: string
  conceptId: string
  targetAudienceId: string
  statement: string
  hypotheses: string
}

export class MakeReservationHandler {
  constructor(
    private readonly repository: Repository,
    private readonly conceptService: ConceptService,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    Sentry.setTag('component', 'Command')
    Sentry.setTag('command_type', 'MakeReservation')
    Sentry.setTag('idea_id', command.ideaId)
    Sentry.setTag('concept_id', command.conceptId)

    try {
      const concept = await this.conceptService.getConceptForReservation(
        command.conceptId
      )

      if (!concept.success) {
        throw new Error(
          `Unable to get concept for reservation: ${concept.message}`
        )
      }

      if (!concept.content) {
        throw new Error(
          `Concept ${command.conceptId} does not have a content for the reservation`
        )
      }

      const requestedTargetAudience = concept.content.targetAudience.find(
        (targetAudience) => targetAudience.id === command.targetAudienceId
      )

      if (!requestedTargetAudience) {
        throw new Error(`Target audience ${command.targetAudienceId} not found`)
      }

      // TODO: Add validation metrics to the target audience
      const targetAudience = TargetAudience.New(
        Identity.Generate().getValue(),
        command.ideaId,
        requestedTargetAudience.segment,
        requestedTargetAudience.description,
        requestedTargetAudience.challenges,
        requestedTargetAudience.why,
        requestedTargetAudience.painPoints,
        requestedTargetAudience.targetingStrategy
      )

      const idea = Idea.New(
        command.ideaId,
        command.conceptId,
        concept.content.problem,
        concept.content.marketExistence,
        concept.content.region,
        concept.content.productType,
        concept.content.stage,
        command.statement,
        command.hypotheses,
        targetAudience
      )

      await this.repository.addIdea(idea)

      this.eventBus.emit(new IdeaCreated(command.ideaId))

      Sentry.setContext('idea', {
        idea_id: command.ideaId,
        status: 'created',
      })
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: { idea_id: command.ideaId, status: 'reservation_error' },
        },
      })

      throw e
    }
  }

  // This is a temporary solution to format the region name as a human readable string
  formatRegionName = (region: string): string =>
    region
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}
