import { Concept } from '@/concept/domain/Aggregate'
import { Repository } from '@/concept/domain/Repository'
import { ConceptAccepted } from '@/concept/domain/events/ConceptAccepted'
import { ConceptTransitioned } from '@/concept/domain/events/ConceptTransitioned'
import { EventBus } from '@/concept/events/EventBus'
import { EventHandler } from '@/concept/events/EventHandler'

export class ConceptTransitionSubscriber implements EventHandler {
  constructor(
    private readonly repository: Repository,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: ConceptAccepted): Promise<void> {
    const conceptId = event.payload.id

    const concept = await this.repository.getById(conceptId)

    if (!concept) {
      throw new Error(`Unable to get concept by ID: ${conceptId}`)
    }

    if (!concept.isAccepted()) {
      throw new Error(`Concept ${conceptId} was not accepted`)
    }

    const ideaId = concept.getIdeaId()

    if (!ideaId) {
      throw new Error(`Concept ${conceptId} does not have an idea ID`)
    }

    await this.repository.updateConcept(
      event.payload.id,
      (concept): Concept => {
        concept.archive()

        return concept
      }
    )

    this.eventBus.emit(
      new ConceptTransitioned(concept.getId().getValue(), ideaId.getValue())
    )
  }
}
