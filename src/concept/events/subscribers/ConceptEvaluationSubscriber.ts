import { Concept } from '@/concept/domain/Aggregate'
import { Evaluation } from '@/concept/domain/Evaluation'
import { Repository } from '@/concept/domain/Repository'
import { ConceptCreated } from '@/concept/domain/events/ConceptCreated'
import { EventHandler } from '@/concept/events/EventHandler'

type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface ConceptEvaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluateConcept(problem: string): Promise<ConceptEvaluation>
}

// TODO: Emit event ConceptEvaluated
export class ConceptEvaluationSubscriber implements EventHandler {
  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  async handle(event: ConceptCreated): Promise<void> {
    const concept = await this.repository.getById(event.payload.id)

    if (!concept) {
      throw new Error(`Unable to get concept by ID: ${event.payload.id}`)
    }

    const evaluation = await this.aiService.evaluateConcept(
      concept.getProblem().getValue()
    )

    await this.repository.updateConcept(
      event.payload.id,
      (concept): Concept => {
        concept.evaluate(
          new Evaluation(
            evaluation.status,
            evaluation.suggestions,
            evaluation.recommendations,
            evaluation.painPoints,
            evaluation.marketExistence,
            evaluation.targetAudience
          )
        )

        return concept
      }
    )
  }
}
