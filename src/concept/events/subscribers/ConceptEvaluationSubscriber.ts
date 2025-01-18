import * as Sentry from '@sentry/nextjs'
import { Concept } from '@/concept/domain/Aggregate'
import { Evaluation } from '@/concept/domain/Evaluation'
import { Repository } from '@/concept/domain/Repository'
import { ConceptCreated } from '@/concept/domain/events/ConceptCreated'
import { ConceptEvaluated } from '@/concept/domain/events/ConceptEvaluated'
import { EventBus } from '@/concept/events/EventBus'
import { EventHandler } from '@/concept/events/EventHandler'

type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface ConceptEvaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
  clarityScore: {
    overallScore: number
    metrics: {
      problemClarity: number
      targetAudienceClarity: number
      scopeDefinition: number
      valuePropositionClarity: number
    }
  }
  languageAnalysis: {
    vagueTerms: string[]
    missingContext: string[]
    ambiguousStatements: string[]
  }
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
  validationMetrics: {
    marketSize: string
    accessibility: number
    painPointIntensity: number
    willingnessToPay: number
  }
}

interface AIService {
  evaluateConcept(
    conceptId: string,
    problem: string
  ): Promise<ConceptEvaluation>
}

export class ConceptEvaluationSubscriber implements EventHandler {
  static className = 'ConceptEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService,
    private readonly eventBus: EventBus
  ) {}

  getName(): string {
    return ConceptEvaluationSubscriber.className
  }

  async handle(event: ConceptCreated): Promise<void> {
    Sentry.setTag('component', 'BackgroundJob')
    Sentry.setTag('job_type', this.getName())
    Sentry.setTag('event_type', event.type)
    Sentry.setTag('concept_id', event.payload.id)

    Sentry.addBreadcrumb({ message: `${this.getName()} started` })

    try {
      const concept = await this.repository.getById(event.payload.id)

      if (!concept) {
        throw new Error(`Unable to get concept by ID: ${event.payload.id}`)
      }

      const evaluation = await this.aiService.evaluateConcept(
        concept.getId().getValue(),
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
              evaluation.targetAudience,
              evaluation.clarityScore,
              evaluation.languageAnalysis
            )
          )

          return concept
        }
      )

      this.eventBus.emit(new ConceptEvaluated(concept.getId().getValue()))
    } catch (e) {
      Sentry.captureException(e, {
        contexts: {
          concept: { concept_id: event.payload.id, status: 'evaluation_error' },
        },
      })

      throw e
    }
  }
}
