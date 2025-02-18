import * as Sentry from '@sentry/nextjs'
import { Identity } from '@/common/domain/Identity'
import { Concept } from '@/concept/domain/Aggregate'
import { Repository } from '@/concept/domain/Repository'
import { ConceptAccepted } from '@/concept/domain/events/ConceptAccepted'
import { EventBus } from '@/concept/events/EventBus'

interface Reservation {
  success: boolean
  message: string
}

interface IdeaService {
  reserve(
    ideaId: string,
    conceptId: string,
    targetAudienceId: string,
    statement: string,
    hypotheses: string
  ): Promise<Reservation>
}

type Command = {
  id: string
  newIdeaId: string
  targetAudienceId: string
  statement: string
  hypotheses: string
}

export class AcceptConceptHandler {
  constructor(
    private readonly repository: Repository,
    private readonly ideaService: IdeaService,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    Sentry.setTag('component', 'Command')
    Sentry.setTag('command_type', 'AcceptConcept')
    Sentry.setTag('concept_id', command.id)
    Sentry.setTag('idea_id', command.newIdeaId)

    try {
      const concept = await this.repository.getById(command.id)

      if (!concept) {
        throw new Error(`Concept with ID ${command.id} does not exist`)
      }

      const reservation = await this.ideaService.reserve(
        command.newIdeaId,
        command.id,
        command.targetAudienceId,
        command.statement,
        command.hypotheses
      )

      if (!reservation.success) {
        throw new Error(`Unable to reserve idea ID: ${reservation.message}`)
      }

      await this.repository.updateConcept(
        command.id,
        (concept: Concept): Concept => {
          concept.accept(Identity.New(command.newIdeaId))

          return concept
        }
      )

      this.eventBus.emit(new ConceptAccepted(command.id))

      Sentry.setContext('concept', {
        concept_id: command.id,
        status: 'accepted',
      })
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          concept: { concept_id: command.id, status: 'acception_error' },
        },
      })

      throw e
    }
  }
}
