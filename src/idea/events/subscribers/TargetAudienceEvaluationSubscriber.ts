import { Idea } from '@/idea/domain/Aggregate'
import { Repository } from '@/idea/domain/Repository'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { EventHandler } from '@/idea/events/EventHandler'

type Evaluation = {
  why: string
  painPoints: string[]
  targetingStrategy: string
}

export interface AIService {
  evaluateTargetAudience(
    problem: string,
    segment: string,
    description: string,
    challenges: string[]
  ): Promise<Evaluation>
}

export class TargetAudienceEvaluationSubscriber implements EventHandler {
  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  async handle(event: IdeaCreated): Promise<void> {
    const idea = await this.repository.getById(event.payload.id)

    if (!idea) {
      throw new Error(`Unable to get idea by ID: ${event.payload.id}`)
    }

    const targetAudiences = await this.repository.getTargetAudiencesByIdeaId(
      idea.getId().getValue()
    )

    const tasks = targetAudiences.map((targetAudience) =>
      this.aiService
        .evaluateTargetAudience(
          idea.getProblem().getValue(),
          targetAudience.getSegment(),
          targetAudience.getDescription(),
          targetAudience.getChallenges()
        )
        .then((evaluation) => {
          targetAudience.setWhy(evaluation.why)
          targetAudience.setPainPoints(evaluation.painPoints)
          targetAudience.setTargetingStrategy(evaluation.targetingStrategy)
          return targetAudience
        })
    )

    const evaluations = await Promise.all(tasks)

    await this.repository.updateIdea(event.payload.id, (idea): Idea => {
      evaluations.forEach((audience) => {
        idea.addTargetAudience(audience)
      })

      return idea
    })
  }
}
