import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { TargetAudiencesEvaluated } from '@/idea/domain/events/TargetAudiencesEvaluated'
import { EventBus } from '@/idea/events/EventBus'
import { EventHandler } from '@/idea/events/EventHandler'

type TargetAudienceEvaluation = {
  id: string
  why: string
  painPoints: string[]
  targetingStrategy: string
}

type Evaluation = TargetAudienceEvaluation[]

interface TargetAudience {
  id: string
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluateTargetAudience(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class TargetAudiencesEvaluationSubscriber implements EventHandler {
  static className = 'TargetAudiencesEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService,
    private readonly eventBus: EventBus
  ) {}

  getName(): string {
    return TargetAudiencesEvaluationSubscriber.className
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

      const targetAudiences = idea.getTargetAudiences()

      const audiences = targetAudiences.map((targetAudience) => ({
        id: targetAudience.getId().getValue(),
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
      }))

      const evaluation = await this.aiService.evaluateTargetAudience(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        audiences
      )

      targetAudiences.forEach((targetAudience) => {
        const id = targetAudience.getId().getValue()
        const targetAudienceEvaluation = evaluation.find(
          (evaluation) => evaluation.id === id
        )

        if (!targetAudienceEvaluation) {
          throw new Error(
            `TargetAudienceEvaluation with ID ${id} does not exist`
          )
        }

        targetAudience.setWhy(targetAudienceEvaluation.why)
        targetAudience.setPainPoints(targetAudienceEvaluation.painPoints)
        targetAudience.setTargetingStrategy(
          targetAudienceEvaluation.targetingStrategy
        )
      })

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        targetAudiences.forEach((targetAudience) => {
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
