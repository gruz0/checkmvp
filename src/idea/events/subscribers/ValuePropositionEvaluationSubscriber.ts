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
    problem: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class ValuePropositionEvaluationSubscriber implements EventHandler {
  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: IdeaCreated): Promise<void> {
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
  }
}
