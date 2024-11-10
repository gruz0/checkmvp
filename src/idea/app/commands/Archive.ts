import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { IdeaArchived } from '@/idea/domain/events/IdeaArchived'
import { EventBus } from '@/idea/events/EventBus'

export type Command = {
  ideaId: string
}

export class ArchivationHandler {
  constructor(
    private readonly repository: Repository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    const idea = await this.repository.getById(command.ideaId)

    if (!idea) {
      throw new Error(`Idea ${command.ideaId} does not exist`)
    }

    await this.repository.updateIdea(command.ideaId, (idea: Idea): Idea => {
      idea.archive()

      return idea
    })

    this.eventBus.emit(new IdeaArchived(command.ideaId))
  }
}
