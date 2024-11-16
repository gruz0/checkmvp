import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface Evaluation {
  why: string
  painPoints: string[]
  targetingStrategy: string
}

const ResponseSchema = z.object({
  target_audience: z.object({
    why: z.string(),
    pain_points: z.array(z.string()),
    targeting_strategy: z.string(),
  }),
})

export class TargetAudienceEvaluator {
  static className = 'TargetAudienceEvaluator'
  static prompt = '00-target-audience-evaluation'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateTargetAudience(
    ideaId: string,
    problem: string,
    segment: string,
    description: string,
    challenges: string[]
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', TargetAudienceEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(TargetAudienceEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${TargetAudienceEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: TargetAudienceEvaluator.model,
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

Here is my segment: """
${segment.trim()} - ${description.trim()}
"""

And their challenges: """
${challenges.join('\n')}
"""
`,
              },
            ],
          },
        ],
        top_p: TargetAudienceEvaluator.nucleusSampling,
        max_completion_tokens: TargetAudienceEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'target_audience'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${TargetAudienceEvaluator.className} called`,
        data: {
          model: TargetAudienceEvaluator.model,
          top_p: TargetAudienceEvaluator.nucleusSampling,
          max_completion_tokens: TargetAudienceEvaluator.maxCompletionTokens,
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

      const targetAudience = message.parsed.target_audience

      return {
        why: targetAudience.why,
        painPoints: targetAudience.pain_points,
        targetingStrategy: targetAudience.targeting_strategy,
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
