import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'
import { TargetAudience, ValueProposition } from './types'

type Keyword = string

type Evaluation = Keyword[]

const ResponseSchema = z.object({
  google_trends_keywords: z.array(z.string()),
})

export class GoogleTrendsKeywordsEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'GoogleTrendsKeywordsEvaluator'
  }
  protected get promptName() {
    return '00-google-trends-keywords-evaluation'
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
    return 'google_trends_keywords'
  }

  async evaluateGoogleTrendsKeywords(
    ideaId: string,
    problem: string,
    targetAudience: TargetAudience,
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const messages = [
      this.messageBuilder.createProblemMessage(problem),
      ...this.messageBuilder.createTargetAudienceMessages(targetAudience),
      this.messageBuilder.createValuePropositionMessage(valueProposition),
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return response.google_trends_keywords
  }
}
