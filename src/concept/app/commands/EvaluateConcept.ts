import { Concept } from '@/concept/domain/Aggregate'
import { Repository } from '@/concept/domain/Repository'
import { ConceptCreated } from '@/concept/domain/events/ConceptCreated'
import { EventBus } from '@/concept/events/EventBus'

export type Command = {
  id: string
  problem: string
}

export class EvaluateConceptHandler {
  constructor(
    private readonly repository: Repository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    const concept = Concept.New(command.id, command.problem)

    await this.repository.addConcept(concept)

    this.eventBus.emit(new ConceptCreated(command.id))
  }
}
