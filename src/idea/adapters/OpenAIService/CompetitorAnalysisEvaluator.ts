import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

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

export class CompetitorAnalysisEvaluator {
  static className = 'CompetitorAnalysisEvaluator'
  static prompt = '00-competitor-analysis'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateCompetitorAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', CompetitorAnalysisEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(CompetitorAnalysisEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${CompetitorAnalysisEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: CompetitorAnalysisEvaluator.model,
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
        top_p: CompetitorAnalysisEvaluator.nucleusSampling,
        max_completion_tokens: CompetitorAnalysisEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(
          ResponseSchema,
          'competitor_analysis'
        ),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${CompetitorAnalysisEvaluator.className} called`,
        data: {
          model: CompetitorAnalysisEvaluator.model,
          top_p: CompetitorAnalysisEvaluator.nucleusSampling,
          max_completion_tokens:
            CompetitorAnalysisEvaluator.maxCompletionTokens,
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

      const competitorAnalysis = message.parsed.competitor_analysis

      return {
        competitors: competitorAnalysis.competitors.map((competitor) => ({
          name: competitor.name,
          productName: competitor.product_name,
          url: competitor.url,
          coreFeatures: competitor.core_features,
          valueProposition: competitor.value_proposition,
          userAcquisition: competitor.user_acquisition,
          strengths: competitor.strengths,
          weaknesses: competitor.weaknesses,
          differentiationOpportunity: competitor.differentiation_opportunity,
        })),
        comparison: {
          strengths: competitorAnalysis.comparison.strengths,
          weaknesses: competitorAnalysis.comparison.weaknesses,
        },
        differentiationSuggestions:
          competitorAnalysis.differentiation_suggestions,
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
