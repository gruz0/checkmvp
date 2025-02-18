import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'
import { TargetAudience, ValueProposition } from './types'

interface Evaluation {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
}

const ResponseSchema = z.object({
  swot_analysis: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(
      z.object({
        description: z.string(),
        action: z.string(),
      })
    ),
    opportunities: z.array(z.string()),
    threats: z.array(
      z.object({
        description: z.string(),
        action: z.string(),
      })
    ),
  }),
})

export class SWOTAnalysisEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'SWOTAnalysisEvaluator'
  }
  protected get promptName() {
    return '00-swot-analysis'
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
    return 'swot_analysis'
  }

  async evaluateSWOTAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const messages = [
      this.messageBuilder.createProblemMessage(problem),
      this.messageBuilder.createMarketExistenceMessage(marketExistence),
      ...this.messageBuilder.createTargetAudienceMessages(targetAudience),
      this.messageBuilder.createValuePropositionMessage(valueProposition),
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      strengths: response.swot_analysis.strengths,
      weaknesses: response.swot_analysis.weaknesses.map(
        (weakness) => `${weakness.description} Action: ${weakness.action}`
      ),
      opportunities: response.swot_analysis.opportunities,
      threats: response.swot_analysis.threats.map(
        (threat) => `${threat.description} Action: ${threat.action}`
      ),
    }
  }
}
