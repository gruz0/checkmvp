import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { Repository } from '@/idea/domain/Repository'
import { TargetAudiencesEvaluated } from '@/idea/domain/events/TargetAudiencesEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'
import { TargetAudience } from './types'

type Evaluation = {
  trends: string
  userBehaviors: string
  marketGaps: string
  innovationOpportunities: string
  strategicDirection: string
}

interface AIService {
  evaluateMarketAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudience: TargetAudience
  ): Promise<Evaluation>
}

export class MarketAnalysisEvaluationSubscriber implements EventHandler {
  static className = 'MarketAnalysisEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return MarketAnalysisEvaluationSubscriber.className
  }

  async handle(event: TargetAudiencesEvaluated): Promise<void> {
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

      const evaluation = await this.aiService.evaluateMarketAnalysis(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        idea.getMarketExistence(),
        targetAudience
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.setMarketAnalysis(
          MarketAnalysis.New(
            evaluation.trends,
            evaluation.userBehaviors,
            evaluation.marketGaps,
            evaluation.innovationOpportunities,
            evaluation.strategicDirection
          )
        )

        return idea
      })

      // TODO: Emit Event
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'market_analysis_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
