import { Idea } from '@/idea/domain/Aggregate'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { Repository } from '@/idea/domain/Repository'
import { IdeaCreated } from '@/idea/domain/events/IdeaCreated'
import { EventHandler } from '@/idea/events/EventHandler'

interface Competitor {
  name: string
  productName: string
  url: string
  coreFeatures: string[]
  valueProposition: string
  userAcquisition: string
  strengths: string[]
  weaknesses: string[]
  differentiationOpportunity: string
}

interface Comparison {
  strengths: string[]
  weaknesses: string[]
}

type Evaluation = {
  competitors: Competitor[]
  comparison: Comparison
  differentiationSuggestions: string[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface AIService {
  evaluateCompetitorAnalysis(
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation>
}

export class CompetitorAnalysisEvaluationSubscriber implements EventHandler {
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

    const evaluation = await this.aiService.evaluateCompetitorAnalysis(
      idea.getProblem().getValue(),
      idea.getMarketExistence(),
      audiences
    )

    await this.repository.updateIdea(event.payload.id, (idea): Idea => {
      idea.addCompetitorAnalysis(
        CompetitorAnalysis.New(
          evaluation.competitors,
          evaluation.comparison,
          evaluation.differentiationSuggestions
        )
      )

      return idea
    })
  }
}
