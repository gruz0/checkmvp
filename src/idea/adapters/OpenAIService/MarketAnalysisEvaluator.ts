import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'
import { TargetAudience } from './types'

interface Evaluation {
  trends: string
  userBehaviors: string
  marketGaps: string
  innovationOpportunities: string
  strategicDirection: string
}

const ResponseSchema = z.object({
  market_analysis_overview: z.object({
    trends: z.array(z.string()),
    user_behaviors: z.array(z.string()),
    market_gaps: z.array(z.string()),
    innovation_opportunities: z.array(z.string()),
    strategic_direction: z.array(z.string()),
  }),
})

export class MarketAnalysisEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'MarketAnalysisEvaluator'
  }
  protected get promptName() {
    return '00-market-analysis-overview'
  }
  protected get model() {
    return 'gpt-4o-mini'
  }
  protected get nucleusSampling() {
    return 0.9
  }
  protected get maxCompletionTokens() {
    return 2000
  }
  protected get responseSchema() {
    return ResponseSchema
  }
  protected get responseKey() {
    return 'market_analysis_overview'
  }

  async evaluateMarketAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudience: TargetAudience
  ): Promise<Evaluation> {
    const messages = [
      this.messageBuilder.createProblemMessage(problem),
      this.messageBuilder.createMarketExistenceMessage(marketExistence),
      ...this.messageBuilder.createTargetAudienceMessages(targetAudience),
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      trends: response.market_analysis_overview.trends.join('\n'),
      userBehaviors:
        response.market_analysis_overview.user_behaviors.join('\n'),
      marketGaps: response.market_analysis_overview.market_gaps.join('\n'),
      innovationOpportunities:
        response.market_analysis_overview.innovation_opportunities.join('\n'),
      strategicDirection:
        response.market_analysis_overview.strategic_direction.join('\n'),
    }
  }
}
