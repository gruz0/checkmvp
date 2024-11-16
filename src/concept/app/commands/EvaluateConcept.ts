import * as Sentry from '@sentry/nextjs'
import { Concept } from '@/concept/domain/Aggregate'
import { Repository } from '@/concept/domain/Repository'
import { ConceptCreated } from '@/concept/domain/events/ConceptCreated'
import { EventBus } from '@/concept/events/EventBus'

type Command = {
  id: string
  problem: string
}

export class EvaluateConceptHandler {
  constructor(
    private readonly repository: Repository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    Sentry.setTag('component', 'Command')
    Sentry.setTag('command_type', 'EvaluateConcept')
    Sentry.setTag('concept_id', command.id)

    try {
      const concept = Concept.New(command.id, command.problem)

      await this.repository.addConcept(concept)

      this.eventBus.emit(new ConceptCreated(command.id))

      Sentry.setContext('concept', {
        concept_id: command.id,
        status: 'created',
      })
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          concept: { concept_id: command.id, status: 'creation_error' },
        },
      })

      throw e
    }
  }
}
