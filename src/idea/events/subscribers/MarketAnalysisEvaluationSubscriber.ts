import { Idea } from '@/idea/domain/Aggregate'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { Repository } from '@/idea/domain/Repository'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { EventHandler } from '@/idea/events/EventHandler'

type Evaluation = {
  trends: string
  userBehaviors: string
  marketGaps: string
  innovationOpportunities: string
  strategicDirection: string
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluateMarketAnalysis(
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class MarketAnalysisEvaluationSubscriber implements EventHandler {
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

    const evaluation = await this.aiService.evaluateMarketAnalysis(
      idea.getProblem().getValue(),
      idea.getMarketExistence(),
      audiences
    )

    await this.repository.updateIdea(event.payload.id, (idea): Idea => {
      idea.addMarketAnalysis(
        MarketAnalysis.New(
          evaluation.trends,
          evaluation.userBehaviors,
          evaluation.marketGaps,
          evaluation.innovationOpportunities,
          evaluation.strategicDirection
        )
      )

      return idea
    })
  }
}
