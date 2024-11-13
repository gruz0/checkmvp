import { Idea } from '@/idea/domain/Aggregate'
import { ContentIdea, Strategy } from '@/idea/domain/ContentIdea'
import { ContentIdeasForMarketing } from '@/idea/domain/ContentIdeasForMarketing'
import { Repository } from '@/idea/domain/Repository'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'

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

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

interface AIService {
  evaluateContentIdeas(
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class ContentIdeasEvaluationSubscriber implements EventHandler {
  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  async handle(event: ValuePropositionEvaluated): Promise<void> {
    const idea = await this.repository.getById(event.payload.id)

    if (!idea) {
      throw new Error(`Unable to get idea by ID: ${event.payload.id}`)
    }

    const targetAudiences = await this.repository.getTargetAudiencesByIdeaId(
      idea.getId().getValue()
    )

    if (targetAudiences.length === 0) {
      throw new Error(`Idea ${event.payload.id} does not have target audiences`)
    }

    const audiences = targetAudiences.map((targetAudience) => ({
      segment: targetAudience.getSegment(),
      description: targetAudience.getDescription(),
      challenges: targetAudience.getChallenges(),
    }))

    const valueProposition = await this.repository.getValuePropositionByIdeaId(
      idea.getId().getValue()
    )

    if (!valueProposition) {
      throw new Error(
        `Idea ${event.payload.id} does not have value proposition`
      )
    }

    const evaluation = await this.aiService.evaluateContentIdeas(
      idea.getProblem().getValue(),
      audiences,
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
      idea.addContentIdeasForMarketing(contentIdeasForMarketing)

      return idea
    })
  }
}
