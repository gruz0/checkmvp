import { randomUUID } from 'crypto'
import * as Sentry from '@sentry/nextjs'
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
    marketExistence: string
    targetAudience: {
      segment: string
      description: string
      challenges: string[]
    }[]
  }
}

interface ConceptService {
  getConceptForReservation(conceptId: string): Promise<ConceptForReservation>
}

type Command = {
  ideaId: string
  conceptId: string
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

      const idea = Idea.New(
        command.ideaId,
        command.conceptId,
        concept.content.problem,
        concept.content.marketExistence
      )

      concept.content.targetAudience.forEach((targetAudience) => {
        idea.addTargetAudience(
          TargetAudience.New(
            randomUUID(),
            command.ideaId,
            targetAudience.segment,
            targetAudience.description,
            targetAudience.challenges
          )
        )
      })

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
}
