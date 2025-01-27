import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface Evaluation {
  problemDefinition: string
  region: string
  marketExistence: string[]
  existingSolutions: string[]
  mainChallenges: string[]
  targetUsers: string
  whyItMatters: string
  opportunities: string[]
  callToAction: string[]
}

const ResponseSchema = z.object({
  context_analysis: z.object({
    problem_definition: z.string(),
    region: z.string(),
    market_existence: z.array(z.string()),
    existing_solutions: z.array(z.string()),
    main_challenges: z.array(z.string()),
    target_users: z.string(),
    why_it_matters: z.string(),
    opportunities: z.array(z.string()),
    call_to_action: z.array(z.string()),
  }),
})

export class ContextAnalysisEvaluator {
  static className = 'ContextAnalysisEvaluator'
  static prompt = '00-context-analysis'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateContext(
    ideaId: string,
    problem: string,
    marketExistence: string
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', ContextAnalysisEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(ContextAnalysisEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${ContextAnalysisEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: ContextAnalysisEvaluator.model,
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
${marketExistence.trim()}"""`,
              },
            ],
          },
        ],
        top_p: ContextAnalysisEvaluator.nucleusSampling,
        max_completion_tokens: ContextAnalysisEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'context_analysis'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${ContextAnalysisEvaluator.className} called`,
        data: {
          model: ContextAnalysisEvaluator.model,
          top_p: ContextAnalysisEvaluator.nucleusSampling,
          max_completion_tokens: ContextAnalysisEvaluator.maxCompletionTokens,
          usage: response.usage,
          choices: response.choices.length,
        },
        level: 'info',
      })

      const message = response.choices[0].message

      if (message.refusal) {
        throw new Error('Message refusal: ' + message.refusal)
      }

      if (!message.parsed) {
        throw new Error('Message was not parsed')
      }

      const contextAnalysis = message.parsed.context_analysis

      return {
        problemDefinition: contextAnalysis.problem_definition,
        region: contextAnalysis.region,
        marketExistence: contextAnalysis.market_existence,
        existingSolutions: contextAnalysis.existing_solutions,
        mainChallenges: contextAnalysis.main_challenges,
        targetUsers: contextAnalysis.target_users,
        whyItMatters: contextAnalysis.why_it_matters,
        opportunities: contextAnalysis.opportunities,
        callToAction: contextAnalysis.call_to_action,
      }
    } catch (e) {
      Sentry.captureException(e)
      throw e
    }
  }
}
