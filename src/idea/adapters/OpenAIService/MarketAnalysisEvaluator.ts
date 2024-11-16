import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

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
    trends: z.string(),
    user_behaviors: z.string(),
    market_gaps: z.string(),
    innovation_opportunities: z.string(),
    strategic_direction: z.string(),
  }),
})

export class MarketAnalysisEvaluator {
  static className = 'MarketAnalysisEvaluator'
  static prompt = '00-market-analysis-overview'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateMarketAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', MarketAnalysisEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(MarketAnalysisEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${MarketAnalysisEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: MarketAnalysisEvaluator.model,
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
        top_p: MarketAnalysisEvaluator.nucleusSampling,
        max_completion_tokens: MarketAnalysisEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'market_analysis'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${MarketAnalysisEvaluator.className} called`,
        data: {
          model: MarketAnalysisEvaluator.model,
          top_p: MarketAnalysisEvaluator.nucleusSampling,
          max_completion_tokens: MarketAnalysisEvaluator.maxCompletionTokens,
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

      const marketAnalysis = message.parsed.market_analysis_overview

      return {
        trends: marketAnalysis.trends,
        userBehaviors: marketAnalysis.user_behaviors,
        marketGaps: marketAnalysis.market_gaps,
        innovationOpportunities: marketAnalysis.innovation_opportunities,
        strategicDirection: marketAnalysis.strategic_direction,
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
