import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

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

const ResponseSchema = z.object({
  product_names: z.array(
    z.object({
      product_name: z.string(),
      domains: z.array(z.string()),
      why: z.string(),
      tagline: z.string(),
      target_audience_insight: z.string(),
      similar_names: z.array(z.string()),
      branding_potential: z.string(),
    })
  ),
})

export class PotentialNamesEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'PotentialNamesEvaluator'
  }
  protected get promptName() {
    return '00-product-names-analysis'
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
    return 'product_names'
  }

  async evaluatePotentialNames(
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
    return response.product_names.map((product) => ({
      productName: product.product_name,
      domains: product.domains,
      why: product.why,
      tagline: product.tagline,
      targetAudienceInsight: product.target_audience_insight,
      similarNames: product.similar_names,
      brandingPotential: product.branding_potential,
    }))
  }
}
