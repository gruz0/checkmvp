import { Idea } from '@/idea/domain/Aggregate'

import { ProductName } from '@/idea/domain/ProductName'
import { Repository } from '@/idea/domain/Repository'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
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
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class PotentialNamesEvaluationSubscriber implements EventHandler {
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

    const audiences = targetAudiences.map((targetAudience) => ({
      segment: targetAudience.getSegment(),
      description: targetAudience.getDescription(),
      challenges: targetAudience.getChallenges(),
    }))

    const evaluation = await this.aiService.evaluatePotentialNames(
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
  }
}
