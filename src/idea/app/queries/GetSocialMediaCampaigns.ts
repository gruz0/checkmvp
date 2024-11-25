import * as Sentry from '@sentry/nextjs'
import { NotFoundError } from '@/common/errors/NotFoundError'
import { Idea } from '@/idea/domain/Aggregate'

type Query = {
  id: string
}

interface ShortFormContentDTO {
  header: string
  platform: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface LongFormContentDTO {
  header: string
  platform: string
  title: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface VideoContentDTO {
  header: string
  platform: string
  title: string
  script: string[]
  tips: string[]
  imagePrompt: string
}

interface DTO {
  id: string
  contents: {
    shortFormContent: Array<ShortFormContentDTO>
    longFormContent: Array<LongFormContentDTO>
    videoContent: Array<VideoContentDTO>
  } | null
}

interface ReadModel {
  getById(id: string): Promise<Idea | null>
}

export class GetSocialMediaCampaignsHandler {
  constructor(private readonly readModel: ReadModel) {}

  async handle(query: Query): Promise<DTO> {
    Sentry.setTag('component', 'Query')
    Sentry.setTag('query_type', 'GetSocialMediaCampaigns')
    Sentry.setTag('idea_id', query.id)

    try {
      const idea = await this.readModel.getById(query.id)

      if (!idea) {
        throw new NotFoundError(`Idea ${query.id} does not exist`)
      }

      const socialMediaCampaigns = idea.getSocialMediaCampaigns()

      return {
        id: idea.getId().getValue(),
        contents: socialMediaCampaigns
          ? {
              shortFormContent: socialMediaCampaigns.getShortFormContents(),
              longFormContent: socialMediaCampaigns.getLongFormContents(),
              videoContent: socialMediaCampaigns.getVideoContents(),
            }
          : null,
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
