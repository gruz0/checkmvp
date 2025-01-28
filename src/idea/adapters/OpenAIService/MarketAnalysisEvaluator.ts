import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

interface Evaluation {
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
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    const messages = [
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
            text: `Here is the problem my product aims to solve: """
${problem.trim()}"""

Also I have a market existence research: """
${marketExistence.trim()}"""

Here are my segments: """
${targetAudiences
  .map((targetAudience, idx) => {
    let content = ''

    content += `Segment ${idx + 1}: ${targetAudience.segment}\n`
    content += `Description: ${targetAudience.description}\n`
    content += `Challenges:\n${targetAudience.challenges.join('; ')}\n\n`

    return content
  })
  .join('\n\n')}
"""`,
          },
        ],
      },
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
