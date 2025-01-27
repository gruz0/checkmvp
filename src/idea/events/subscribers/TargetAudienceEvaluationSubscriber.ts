import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { TargetAudiencesEvaluated } from '@/idea/domain/events/TargetAudiencesEvaluated'
import { EventBus } from '@/idea/events/EventBus'
import { EventHandler } from '@/idea/events/EventHandler'

type Evaluation = {
  why: string
  painPoints: string[]
  targetingStrategy: string
}

interface AIService {
  evaluateTargetAudience(
    ideaId: string,
    problem: string,
    segment: string,
    description: string,
    challenges: string[]
  ): Promise<Evaluation>
}

export class TargetAudienceEvaluationSubscriber implements EventHandler {
  static className = 'TargetAudienceEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService,
    private readonly eventBus: EventBus
  ) {}

  getName(): string {
    return TargetAudienceEvaluationSubscriber.className
  }

  async handle(event: IdeaCreated): Promise<void> {
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

      // FIXME: It must be refactored to analyze all target audiences at once

      // Collect all evaluations first
      const evaluations = await Promise.all(
        idea.getTargetAudiences().map(async (targetAudience) => {
          const evaluation = await this.aiService.evaluateTargetAudience(
            idea.getId().getValue(),
            idea.getProblem().getValue(),
            targetAudience.getSegment(),
            targetAudience.getDescription(),
            targetAudience.getChallenges()
          )

          // Validate evaluation data before proceeding
          if (
            !evaluation.why ||
            !Array.isArray(evaluation.painPoints) ||
            evaluation.painPoints.length === 0
          ) {
            throw new Error(
              `Invalid evaluation data for target audience ${targetAudience.getId().getValue()}`
            )
          }

          return {
            targetAudience,
            evaluation,
          }
        })
      )

      // Update idea with validated evaluations
      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        evaluations.forEach(({ targetAudience, evaluation }) => {
          targetAudience.setWhy(evaluation.why)
          targetAudience.setPainPoints(evaluation.painPoints)
          targetAudience.setTargetingStrategy(evaluation.targetingStrategy)
          idea.updateTargetAudience(targetAudience)
        })

        return idea
      })

      this.eventBus.emit(new TargetAudiencesEvaluated(idea.getId().getValue()))
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'target_audience_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
