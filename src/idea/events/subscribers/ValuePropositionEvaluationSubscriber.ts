import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { ValueProposition } from '@/idea/domain/ValueProposition'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventBus } from '@/idea/events/EventBus'
import { EventHandler } from '@/idea/events/EventHandler'

type Evaluation = {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluateValueProposition(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class ValuePropositionEvaluationSubscriber implements EventHandler {
  static className = 'ValuePropositionEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService,
    private readonly eventBus: EventBus
  ) {}

  getName(): string {
    return ValuePropositionEvaluationSubscriber.className
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

      const targetAudiences = await this.repository.getTargetAudiencesByIdeaId(
        idea.getId().getValue()
      )

      const audiences = targetAudiences.map((targetAudience) => ({
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
      }))

      const evaluation = await this.aiService.evaluateValueProposition(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        audiences
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        idea.addValueProposition(
          ValueProposition.New(
            evaluation.mainBenefit,
            evaluation.problemSolving,
            evaluation.differentiation
          )
        )

        return idea
      })

      this.eventBus.emit(new ValuePropositionEvaluated(idea.getId().getValue()))
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'value_proposition_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
