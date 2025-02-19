import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { ContentIdea } from '@/idea/domain/ContentIdea'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { Repository } from '@/idea/domain/Repository'
import { Strategy } from '@/idea/domain/Strategy'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'
import { TargetAudience, ValueProposition } from './types'

type Section =
  | 'socialMediaCampaigns'
  | 'bloggingAndGuestPosts'
  | 'emailMarketing'
  | 'surveysAndPolls'
  | 'videoContent'
  | 'infographicsAndVisualContent'
  | 'communityEngagement'
  | 'paidAdvertising'
  | 'webinarsAndLiveStreams'
  | 'partnershipsAndCollaborations'

interface ContentStrategy {
  section: Section
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

type Evaluation = ContentStrategy[]

interface AIService {
  evaluateContentIdeas(
    ideaId: string,
    problem: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class ContentIdeasEvaluationSubscriber implements EventHandler {
  static className = 'ContentIdeasEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return ContentIdeasEvaluationSubscriber.className
  }

  async handle(event: ValuePropositionEvaluated): Promise<void> {
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

      const targetAudience: TargetAudience = {
        segment: idea.getTargetAudience().getSegment(),
        description: idea.getTargetAudience().getDescription(),
        challenges: idea.getTargetAudience().getChallenges(),
      }

      const valueProposition = idea.getValueProposition()

      if (!valueProposition) {
        throw new Error(
          `Idea ${event.payload.id} does not have value proposition`
        )
      }

      const evaluation = await this.aiService.evaluateContentIdeas(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        targetAudience,
        {
          mainBenefit: valueProposition.getMainBenefit(),
          problemSolving: valueProposition.getProblemSolving(),
          differentiation: valueProposition.getDifferentiation(),
        }
      )

      const contentIdeasForMarketing = ContentIdeasForMarketing.New()

      evaluation.forEach((strategy) => {
        contentIdeasForMarketing.addContentIdea(
          ContentIdea.New(
            Strategy.New(strategy.section),
            strategy.platforms,
            strategy.ideas,
            strategy.benefits
          )
        )
      })

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.setContentIdeasForMarketing(contentIdeasForMarketing)

        return idea
      })

      // TODO: Emit Event
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'content_ideas_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
