import { Idea } from '@/idea/domain/Aggregate'
import { CompetitorAnalysis } from '@/idea/domain/CompetitorAnalysis'
import { MarketAnalysis } from '@/idea/domain/MarketAnalysis'
import { TargetAudience } from '@/idea/domain/TargetAudience'
import { ValueProposition } from '@/idea/domain/ValueProposition'

export type Query = {
  id: string
}

interface FullIdeaDTO {
  id: string
  problem: string
  marketExistence: string
  valueProposition: {
    mainBenefit: string
    problemSolving: string
    differentiation: string
  } | null
  targetAudiences: Array<{
    id: string
    segment: string
    description: string
    challenges: string[]
    why: string | null
    painPoints: string[] | null
    targetingStrategy: string | null
  }>
  marketAnalysis: {
    trends: string
    userBehaviors: string
    marketGaps: string
    innovationOpportunities: string
    strategicDirection: string
  } | null
  competitorAnalysis: {
    competitors: Array<{
      name: string
      productName: string
      url: string
      coreFeatures: string[]
      valueProposition: string
      userAcquisition: string
      strengths: string[]
      weaknesses: string[]
      differentiationOpportunity: string
    }>
    comparison: {
      strengths: string[]
      weaknesses: string[]
    }
    differentiationSuggestions: string[]
  } | null
}

interface ReadModel {
  getById(id: string): Promise<Idea | null>
  getTargetAudiencesByIdeaId(ideaId: string): Promise<TargetAudience[]>
  getValuePropositionByIdeaId(ideaId: string): Promise<ValueProposition | null>
  getMarketAnalysisByIdeaId(ideaId: string): Promise<MarketAnalysis | null>
  getCompetitorAnalysisByIdeaId(
    ideaId: string
  ): Promise<CompetitorAnalysis | null>
}

export class GetIdeaHandler {
  constructor(private readonly readModel: ReadModel) {}

  async handle(query: Query): Promise<FullIdeaDTO> {
    const idea = await this.readModel.getById(query.id)

    if (!idea) {
      throw new Error(`Idea ${query.id} does not exist`)
    }

    const targetAudiences = await this.readModel.getTargetAudiencesByIdeaId(
      query.id
    )

    const valueProposition = await this.readModel.getValuePropositionByIdeaId(
      query.id
    )

    const marketAnalysis = await this.readModel.getMarketAnalysisByIdeaId(
      query.id
    )

    const competitorAnalysis =
      await this.readModel.getCompetitorAnalysisByIdeaId(query.id)

    return {
      id: idea.getId().getValue(),
      problem: idea.getProblem().getValue(),
      marketExistence: idea.getMarketExistence(),
      valueProposition: valueProposition
        ? {
            mainBenefit: valueProposition.getMainBenefit(),
            problemSolving: valueProposition.getProblemSolving(),
            differentiation: valueProposition.getDifferentiation(),
          }
        : null,
      targetAudiences: targetAudiences.map((audience) => ({
        id: audience.getId().getValue(),
        segment: audience.getSegment(),
        description: audience.getDescription(),
        challenges: audience.getChallenges(),
        why: audience.getWhy(),
        painPoints: audience.getPainPoints(),
        targetingStrategy: audience.getTargetingStrategy(),
      })),
      marketAnalysis: marketAnalysis
        ? {
            trends: marketAnalysis.getTrends(),
            userBehaviors: marketAnalysis.getUserBehaviors(),
            marketGaps: marketAnalysis.getMarketGaps(),
            innovationOpportunities:
              marketAnalysis.getInnovationOpportunities(),
            strategicDirection: marketAnalysis.getStrategicDirection(),
          }
        : null,
      competitorAnalysis: competitorAnalysis
        ? {
            competitors: competitorAnalysis.getCompetitors(),
            comparison: competitorAnalysis.getComparison(),
            differentiationSuggestions:
              competitorAnalysis.getDifferentiationSuggestions(),
          }
        : null,
    }
  }
}
