import { z } from 'zod'
import { BasePrompt } from './BasePrompt'

interface Evaluation {
  hypothesis: string
  targetAudiences: string[]
  region: string
  productType: string
}

const ResponseSchema = z.object({
  hypothesis_generator: z.object({
    hypothesis: z.string(),
    target_audiences: z.array(z.string()),
    region: z.enum([
      'worldwide',
      'north_america',
      'europe',
      'asia',
      'africa',
      'south_america',
      'oceania',
    ]),
    product_type: z.enum(['b2b', 'b2c', 'b2b2c', 'saas', 'marketplace']),
  }),
})

export class HypothesisGenerator extends BasePrompt<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'HypothesisGenerator'
  }
  protected get promptName() {
    return '00-hypothesis-generator'
  }
  protected get model() {
    return 'gpt-4o-mini'
  }
  protected get nucleusSampling() {
    return 0.7
  }
  protected get maxCompletionTokens() {
    return 2000
  }
  protected get responseSchema() {
    return ResponseSchema
  }
  protected get responseKey() {
    return 'hypothesis_generator'
  }

  async generate(content: string): Promise<Evaluation> {
    return this.evaluate([this.buildUserMessage(content)])
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      hypothesis: response.hypothesis_generator.hypothesis,
      targetAudiences: response.hypothesis_generator.target_audiences,
      region: response.hypothesis_generator.region,
      productType: response.hypothesis_generator.product_type,
    }
  }
}
