import * as Sentry from '@sentry/nextjs'
import { Repository } from '@/idea/domain/Repository'
import { SocialMediaCampaignsRequested } from '@/idea/domain/events/SocialMediaCampaignsRequested'
import { EventBus } from '@/idea/events/EventBus'

type Command = {
  ideaId: string
}

export class RequestSocialMediaCampaignsHandler {
  constructor(
    private readonly repository: Repository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: Command): Promise<void> {
    Sentry.setTag('component', 'Command')
    Sentry.setTag('command_type', 'RequestSocialMediaCampaigns')
    Sentry.setTag('idea_id', command.ideaId)

    try {
      const idea = await this.repository.getById(command.ideaId)

      if (!idea) {
        throw new Error(`Idea ${command.ideaId} does not exist`)
      }

      const socialMediaCampaigns =
        await this.repository.getSocialMediaCampaignsByIdeaId(command.ideaId)

      if (socialMediaCampaigns) {
        return
      }

      this.eventBus.emit(new SocialMediaCampaignsRequested(command.ideaId))
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: command.ideaId,
            status: 'social_media_campaigns_request_error',
          },
        },
      })

      throw e
    }
  }
}
