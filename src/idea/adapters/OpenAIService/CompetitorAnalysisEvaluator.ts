import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

interface Evaluation {
  competitors: Competitor[]
  comparison: Comparison
  differentiationSuggestions: string[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

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

const ResponseSchema = z.object({
  competitor_analysis: z.object({
    competitors: z.array(
      z.object({
        name: z.string(),
        product_name: z.string(),
        url: z.string(),
        core_features: z.array(z.string()),
        value_proposition: z.string(),
        user_acquisition: z.string(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        differentiation_opportunity: z.string(),
      })
    ),
    comparison: z.object({
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
    }),
    differentiation_suggestions: z.array(z.string()),
  }),
})

export class CompetitorAnalysisEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'CompetitorAnalysisEvaluator'
  }
  protected get promptName() {
    return '00-competitor-analysis'
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
    return 'competitor_analysis'
  }

  async evaluateCompetitorAnalysis(
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
      competitors: response.competitor_analysis.competitors.map(
        (competitor) => ({
          name: competitor.name,
          productName: competitor.product_name,
          url: competitor.url,
          coreFeatures: competitor.core_features,
          valueProposition: competitor.value_proposition,
          userAcquisition: competitor.user_acquisition,
          strengths: competitor.strengths,
          weaknesses: competitor.weaknesses,
          differentiationOpportunity: competitor.differentiation_opportunity,
        })
      ),
      comparison: {
        strengths: response.competitor_analysis.comparison.strengths,
        weaknesses: response.competitor_analysis.comparison.weaknesses,
      },
      differentiationSuggestions:
        response.competitor_analysis.differentiation_suggestions,
    }
  }
}
