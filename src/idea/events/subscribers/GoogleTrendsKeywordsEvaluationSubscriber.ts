import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { GoogleTrendsKeyword } from '@/idea/domain/GoogleTrendsKeyword'
import { Repository } from '@/idea/domain/Repository'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'

type Keyword = string

type Evaluation = Keyword[]

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
  evaluateGoogleTrendsKeywords(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class GoogleTrendsKeywordsEvaluationSubscriber implements EventHandler {
  static className = 'GoogleTrendsKeywordsEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return GoogleTrendsKeywordsEvaluationSubscriber.className
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

      const evaluation = await this.aiService.evaluateGoogleTrendsKeywords(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        audiences,
        {
          mainBenefit: valueProposition.getMainBenefit(),
          problemSolving: valueProposition.getProblemSolving(),
          differentiation: valueProposition.getDifferentiation(),
        }
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        evaluation.forEach((keyword) => {
          idea.addGoogleTrendsKeyword(GoogleTrendsKeyword.New(keyword))
        })

        return idea
      })

      // TODO: Emit Event
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'google_trends_keywords_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
