import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { ContextAnalysis } from '@/idea/domain/ContextAnalysis'
import { Repository } from '@/idea/domain/Repository'
import { ContextAnalysisEvaluated } from '@/idea/domain/events/ContextAnalysisEvaluated'
import { TargetAudiencesEvaluated } from '@/idea/domain/events/TargetAudiencesEvaluated'
import { EventBus } from '@/idea/events/EventBus'
import { EventHandler } from '@/idea/events/EventHandler'

interface KeyMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

interface ActionPriority {
  action: string
  impact: number
  effort: number
  impactDescription: string
  effortDescription: string
}

type Evaluation = {
  problemDefinition: string
  region: string
  marketExistence: string[]
  existingSolutions: string[]
  mainChallenges: string[]
  targetUsers: string
  whyItMatters: string
  opportunities: string[]
  callToAction: string[]
  keyMetrics: KeyMetric[]
  actionPriorities: ActionPriority[]
}

interface AIService {
  evaluateContext(
    ideaId: string,
    problem: string,
    marketExistence: string
  ): Promise<Evaluation>
}

export class ContextAnalysisEvaluationSubscriber implements EventHandler {
  static className = 'ContextAnalysisEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService,
    private readonly eventBus: EventBus
  ) {}

  getName(): string {
    return ContextAnalysisEvaluationSubscriber.className
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

      const evaluation = await this.aiService.evaluateContext(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        idea.getMarketExistence()
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.setContextAnalysis(
          ContextAnalysis.New(
            evaluation.problemDefinition,
            evaluation.region,
            evaluation.marketExistence,
            evaluation.existingSolutions,
            evaluation.mainChallenges,
            evaluation.targetUsers,
            evaluation.whyItMatters,
            evaluation.opportunities,
            evaluation.callToAction,
            evaluation.keyMetrics,
            evaluation.actionPriorities
          )
        )

        return idea
      })

      this.eventBus.emit(new ContextAnalysisEvaluated(idea.getId().getValue()))
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'context_analysis_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
