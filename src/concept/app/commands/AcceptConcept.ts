import { Concept } from '@/concept/domain/Aggregate'
import { Repository } from '@/concept/domain/Repository'
import { ConceptAccepted } from '@/concept/domain/events/ConceptAccepted'
import { EventBus } from '@/concept/events/EventBus'

interface Reservation {
  success: boolean
  message: string
}

export interface IdeaService {
  reserve(ideaId: string, conceptId: string): Promise<Reservation>
}

export type Command = {
  id: string
  newIdeaId: string
}

export class AcceptConceptHandler {
  constructor(
    private readonly repository: Repository,
    private readonly ideaService: IdeaService,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    const concept = await this.repository.getById(command.id)

    if (!concept) {
      throw new Error(`Concept with ID ${command.id} does not exist`)
    }

    const reservation = await this.ideaService.reserve(
      command.newIdeaId,
      command.id
    )

    if (!reservation.success) {
      throw new Error(`Unable to reserve idea ID: ${reservation.message}`)
    }

    await this.repository.updateConcept(
      command.id,
      (concept: Concept): Concept => {
        concept.accept(command.newIdeaId)

        return concept
      }
    )

    this.eventBus.emit(new ConceptAccepted(command.id))
  }
}
