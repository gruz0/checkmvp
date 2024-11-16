import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
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
  static className = 'PotentialNamesEvaluator'
  static prompt = '00-product-names-analysis'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluatePotentialNames(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', PotentialNamesEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(PotentialNamesEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${PotentialNamesEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: PotentialNamesEvaluator.model,
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
        top_p: PotentialNamesEvaluator.nucleusSampling,
        max_completion_tokens: PotentialNamesEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'product_names'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${PotentialNamesEvaluator.className} called`,
        data: {
          model: PotentialNamesEvaluator.model,
          top_p: PotentialNamesEvaluator.nucleusSampling,
          max_completion_tokens: PotentialNamesEvaluator.maxCompletionTokens,
          usage: response.usage,
          choices: response.choices.length,
        },
        level: 'info',
      })

      const message = response.choices[0].message

      if (message.refusal) {
        // TODO: Handle refusal
        throw new Error('Message refusal: ' + message.refusal)
      }

      if (!message.parsed) {
        // TODO: Add Sentry message context
        throw new Error('Message was not parsed')
      }

      return message.parsed.product_names.map((product) => ({
        productName: product.product_name,
        domains: product.domains,
        why: product.why,
        tagline: product.tagline,
        targetAudienceInsight: product.target_audience_insight,
        similarNames: product.similar_names,
        brandingPotential: product.branding_potential,
      }))
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
