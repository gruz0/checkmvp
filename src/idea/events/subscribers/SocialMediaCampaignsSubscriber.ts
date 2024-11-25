import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { SocialMediaCampaigns } from '@/idea/domain/SocialMediaCampaigns'
import { SocialMediaCampaignsRequested } from '@/idea/domain/events/SocialMediaCampaignsRequested'
import { EventHandler } from '@/idea/events/EventHandler'

interface ShortFormContent {
  header: string
  platform: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface LongFormContent {
  header: string
  platform: string
  title: string
  content: string
  tips: string[]
  imagePrompt: string
}

interface VideoContent {
  header: string
  platform: string
  title: string
  script: string[]
  tips: string[]
  imagePrompt: string
}

type Evaluation = {
  shortFormContents: ShortFormContent[]
  longFormContents: LongFormContent[]
  videoContents: VideoContent[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
}

interface AIService {
  evaluateSocialMediaCampaigns(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class SocialMediaCampaignsSubscriber implements EventHandler {
  static className = 'SocialMediaCampaignsSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return SocialMediaCampaignsSubscriber.className
  }

  async handle(event: SocialMediaCampaignsRequested): Promise<void> {
    Sentry.setTag('component', 'BackgroundJob')
    Sentry.setTag('job_type', this.getName())
    Sentry.setTag('event_type', event.type)
    Sentry.setTag('idea_id', event.payload.id)

    Sentry.addBreadcrumb({ message: `${this.getName()} started` })

    try {
      const idea = await this.repository.getById(event.payload.id)

      if (!idea) {
        throw new Error(`Unable to get idea by ID: ${event.payload.id}`)
      }

      const audiences = idea.getTargetAudiences().map((targetAudience) => ({
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
      }))

      const valueProposition = idea.getValueProposition()

      if (!valueProposition) {
        throw new Error(
          `Idea ${event.payload.id} does not have value proposition`
        )
      }

      const evaluation = await this.aiService.evaluateSocialMediaCampaigns(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        audiences,
        {
          mainBenefit: valueProposition.getMainBenefit(),
          problemSolving: valueProposition.getProblemSolving(),
        }
      )

      const socialMediaCampaigns = SocialMediaCampaigns.New()

      evaluation.shortFormContents.forEach((content) => {
        socialMediaCampaigns.addShortFormContent({
          header: content.header,
          platform: content.platform,
          content: content.content,
          tips: content.tips,
          imagePrompt: content.imagePrompt,
        })
      })

      evaluation.longFormContents.forEach((content) => {
        socialMediaCampaigns.addLongFormContent({
          header: content.header,
          platform: content.platform,
          title: content.title,
          content: content.content,
          tips: content.tips,
          imagePrompt: content.imagePrompt,
        })
      })

      evaluation.videoContents.forEach((content) => {
        socialMediaCampaigns.addVideoContent({
          header: content.header,
          platform: content.platform,
          title: content.title,
          script: content.script,
          tips: content.tips,
          imagePrompt: content.imagePrompt,
        })
      })

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.setSocialMediaCampaigns(socialMediaCampaigns)

        return idea
      })

      // TODO: Emit Event
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'social_media_campaigns_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
