import * as Sentry from '@sentry/nextjs'
import { Concept } from '@/concept/domain/Aggregate'
import { AssumptionsAnalysis } from '@/concept/domain/AssumptionsAnalysis'
import { ClarityScore } from '@/concept/domain/ClarityScore'
import { Evaluation } from '@/concept/domain/Evaluation'
import { HypothesisFramework } from '@/concept/domain/HypothesisFramework'
import { LanguageAnalysis } from '@/concept/domain/LanguageAnalysis'
import { Repository } from '@/concept/domain/Repository'
import { TargetAudience } from '@/concept/domain/TargetAudience'
import { ValidationMetrics } from '@/concept/domain/ValidationMetrics'
import { ValidationPlan } from '@/concept/domain/ValidationPlan'
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
  targetAudience: TargetAudienceEvaluation[]
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
  assumptionsAnalysis: {
    coreAssumptions: string[]
    testability: number
    riskLevel: 'high' | 'medium' | 'low'
    validationMethods: string[]
  } | null
  hypothesisFramework: {
    format: string
    examples: string[]
  } | null
  validationPlan: {
    quickWins: string[]
    mediumEffort: string[]
    deepDive: string[]
    successCriteria: string[]
  } | null
}

interface TargetAudienceEvaluation {
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
    problem: string,
    persona: string,
    region: string,
    productType: string,
    stage: string
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
        concept.getProblem().getValue(),
        concept.getPersona().getValue(),
        concept.getRegion().getValue(),
        concept.getProductType().getValue(),
        concept.getStage().getValue()
      )

      let assumptionAnalysis: AssumptionsAnalysis | null = null

      if (evaluation.assumptionsAnalysis) {
        assumptionAnalysis = AssumptionsAnalysis.New(
          evaluation.assumptionsAnalysis.coreAssumptions,
          evaluation.assumptionsAnalysis.testability,
          evaluation.assumptionsAnalysis.riskLevel,
          evaluation.assumptionsAnalysis.validationMethods
        )
      }

      let hypothesisFramework: HypothesisFramework | null = null

      if (evaluation.hypothesisFramework) {
        hypothesisFramework = HypothesisFramework.New(
          evaluation.hypothesisFramework.format,
          evaluation.hypothesisFramework.examples
        )
      }

      let validationPlan: ValidationPlan | null = null

      if (evaluation.validationPlan) {
        validationPlan = ValidationPlan.New(
          evaluation.validationPlan.quickWins,
          evaluation.validationPlan.mediumEffort,
          evaluation.validationPlan.deepDive,
          evaluation.validationPlan.successCriteria
        )
      }

      await this.repository.updateConcept(
        event.payload.id,
        (concept): Concept => {
          concept.evaluate(
            Evaluation.New(
              evaluation.status,
              evaluation.suggestions,
              evaluation.recommendations,
              evaluation.painPoints,
              evaluation.marketExistence,
              evaluation.targetAudience.map((targetAudience) =>
                TargetAudience.New(
                  targetAudience.segment,
                  targetAudience.description,
                  targetAudience.challenges,
                  ValidationMetrics.New(
                    targetAudience.validationMetrics.marketSize,
                    targetAudience.validationMetrics.accessibility,
                    targetAudience.validationMetrics.painPointIntensity,
                    targetAudience.validationMetrics.willingnessToPay
                  )
                )
              ),
              ClarityScore.New(
                evaluation.clarityScore.overallScore,
                evaluation.clarityScore.metrics
              ),
              LanguageAnalysis.New(
                evaluation.languageAnalysis.vagueTerms,
                evaluation.languageAnalysis.missingContext,
                evaluation.languageAnalysis.ambiguousStatements
              ),
              assumptionAnalysis,
              hypothesisFramework,
              validationPlan
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
