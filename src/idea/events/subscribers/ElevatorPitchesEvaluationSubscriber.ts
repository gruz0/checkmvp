import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { ElevatorPitch } from '@/idea/domain/ElevatorPitch'
import { Repository } from '@/idea/domain/Repository'
import { ValuePropositionEvaluated } from '@/idea/domain/events/ValuePropositionEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'
import { TargetAudience, ValueProposition } from './types'

interface Pitch {
  hook: string
  problem: string
  solution: string
  valueProposition: string
  cta: string
}

type Evaluation = Pitch[]

interface AIService {
  evaluateElevatorPitches(
    ideaId: string,
    problem: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation>
}

export class ElevatorPitchesEvaluationSubscriber implements EventHandler {
  static className = 'ElevatorPitchesEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return ElevatorPitchesEvaluationSubscriber.className
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

      const evaluation = await this.aiService.evaluateElevatorPitches(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        targetAudience,
        {
          mainBenefit: valueProposition.getMainBenefit(),
          problemSolving: valueProposition.getProblemSolving(),
          differentiation: valueProposition.getDifferentiation(),
        }
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        evaluation.forEach((pitch) => {
          idea.addElevatorPitch(
            ElevatorPitch.New(
              pitch.hook,
              pitch.problem,
              pitch.solution,
              pitch.valueProposition,
              pitch.cta
            )
          )
        })

        return idea
      })

      // TODO: Emit Event
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          idea: {
            idea_id: event.payload.id,
            status: 'elevator_pitches_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
