import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { SWOTAnalysis } from '@/idea/domain/SWOTAnalysis'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'
import { TargetAudience, ValueProposition } from './types'

interface Evaluation {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
}

interface AIService {
  evaluateSWOTAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class SWOTAnalysisEvaluationSubscriber implements EventHandler {
  static className = 'SWOTAnalysisEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return SWOTAnalysisEvaluationSubscriber.className
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

      const evaluation = await this.aiService.evaluateSWOTAnalysis(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        idea.getMarketExistence(),
        targetAudience,
        {
          mainBenefit: valueProposition.getMainBenefit(),
          problemSolving: valueProposition.getProblemSolving(),
          differentiation: valueProposition.getDifferentiation(),
        }
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.setSWOTAnalysis(
          SWOTAnalysis.New(
            evaluation.strengths,
            evaluation.weaknesses,
            evaluation.opportunities,
            evaluation.threats
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
            status: 'swot_analysis_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
