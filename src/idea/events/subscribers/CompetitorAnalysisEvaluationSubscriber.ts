import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { Repository } from '@/idea/domain/Repository'
import { TargetAudiencesEvaluated } from '@/idea/domain/events/TargetAudiencesEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'

interface Competitor {
  name: string
  productName: string
  url: string
  coreFeatures: string[]
  valueProposition: string
  userAcquisition: string
  strengths: string[]
  weaknesses: string[]
  differentiationOpportunity: string
}

interface Comparison {
  strengths: string[]
  weaknesses: string[]
}

type Evaluation = {
  competitors: Competitor[]
  comparison: Comparison
  differentiationSuggestions: string[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluateCompetitorAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class CompetitorAnalysisEvaluationSubscriber implements EventHandler {
  static className = 'CompetitorAnalysisEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return CompetitorAnalysisEvaluationSubscriber.className
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

      const audiences = idea.getTargetAudiences().map((targetAudience) => ({
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
      }))

      const evaluation = await this.aiService.evaluateCompetitorAnalysis(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        idea.getMarketExistence(),
        audiences
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.setCompetitorAnalysis(
          CompetitorAnalysis.New(
            evaluation.competitors,
            evaluation.comparison,
            evaluation.differentiationSuggestions
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
            status: 'competitor_analysis_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
