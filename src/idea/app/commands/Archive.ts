import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { IdeaArchived } from '@/idea/domain/events/IdeaArchived'
import { EventBus } from '@/idea/events/EventBus'

type Command = {
  ideaId: string
}

export class ArchivationHandler {
  constructor(
    private readonly repository: Repository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    Sentry.setTag('component', 'Command')
    Sentry.setTag('command_type', 'Archive')
    Sentry.setTag('idea_id', command.ideaId)

    try {
      const idea = await this.repository.getById(command.ideaId)

      if (!idea) {
        throw new Error(`Idea ${command.ideaId} does not exist`)
      }

      await this.repository.updateIdea(command.ideaId, (idea: Idea): Idea => {
        idea.archive()

        return idea
      })

      this.eventBus.emit(new IdeaArchived(command.ideaId))

      Sentry.setContext('idea', {
        idea_id: command.ideaId,
        status: 'archived',
      })
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: { idea_id: command.ideaId, status: 'archivation_error' },
        },
      })

      throw e
    }
  }
}
