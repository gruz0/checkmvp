import * as Sentry from '@sentry/nextjs'
import { Idea } from '@/idea/domain/Aggregate'
import { ProductName } from '@/idea/domain/ProductName'
import { Repository } from '@/idea/domain/Repository'
import { TargetAudiencesEvaluated } from '@/idea/domain/events/TargetAudiencesEvaluated'
import { EventHandler } from '@/idea/events/EventHandler'

interface PotentialName {
  productName: string
  domains: string[]
  why: string
  tagline: string
  targetAudienceInsight: string
  similarNames: string[]
  brandingPotential: string
}

type Evaluation = PotentialName[]

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluatePotentialNames(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class PotentialNamesEvaluationSubscriber implements EventHandler {
  static className = 'PotentialNamesEvaluationSubscriber'

  constructor(
    private readonly repository: Repository,
    private readonly aiService: AIService
  ) {}

  getName(): string {
    return PotentialNamesEvaluationSubscriber.className
  }

  async handle(event: TargetAudiencesEvaluated): Promise<void> {
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

      const audiences = idea.getTargetAudiences().map((targetAudience) => ({
        segment: targetAudience.getSegment(),
        description: targetAudience.getDescription(),
        challenges: targetAudience.getChallenges(),
      }))

      const evaluation = await this.aiService.evaluatePotentialNames(
        idea.getId().getValue(),
        idea.getProblem().getValue(),
        idea.getMarketExistence(),
        audiences
      )

      await this.repository.updateIdea(event.payload.id, (idea): Idea => {
        evaluation.forEach((product) => {
          idea.addProductName(
            ProductName.New(
              product.productName,
              product.domains,
              product.why,
              product.tagline,
              product.targetAudienceInsight,
              product.similarNames,
              product.brandingPotential
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
            status: 'potential_names_evaluation_error',
          },
        },
      })

      throw e
    }
  }
}
