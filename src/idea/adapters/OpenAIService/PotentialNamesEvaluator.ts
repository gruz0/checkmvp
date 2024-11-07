import OpenAI from 'openai'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

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

export class PotentialNamesEvaluator {
  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluatePotentialNames(
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    const promptContent = getPromptContent('00-product-names-analysis')

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: promptContent.trim(),
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
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
      ],
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0.7,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const analysis = ResponseSchema.parse(JSON.parse(content))

    return analysis.product_names.map((product) => ({
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
