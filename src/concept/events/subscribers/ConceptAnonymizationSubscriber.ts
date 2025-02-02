import * as Sentry from '@sentry/nextjs'
import { Concept } from '@/concept/domain/Aggregate'
import { Repository } from '@/concept/domain/Repository'
import { Anonymization } from '@/concept/domain/anonymization/AnonymizationService'
import { ConceptTransitioned } from '@/concept/domain/events/ConceptTransitioned'
import { EventHandler } from '@/concept/events/EventHandler'

export class ConceptAnonymizationSubscriber implements EventHandler {
  static className = 'ConceptAnonymizationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly anonymization: Anonymization
  ) {}

  getName(): string {
    return ConceptAnonymizationSubscriber.className
  }

  async handle(event: ConceptTransitioned): Promise<void> {
    Sentry.setTag('component', 'BackgroundJob')
    Sentry.setTag('job_type', this.getName())
    Sentry.setTag('event_type', event.type)
    Sentry.setTag('concept_id', event.payload.id)

    Sentry.addBreadcrumb({ message: `${this.getName()} started` })

    try {
      await this.repository.updateConcept(
        event.payload.id,
        (concept): Concept => this.anonymization.anonymizeConcept(concept)
      )
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          concept: {
            concept_id: event.payload.id,
            status: 'anonymizing_concept_error',
          },
        },
      })

      throw e
    }
  }
}
