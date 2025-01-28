import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

type TargetAudienceEvaluation = {
  id: string
  why: string
  painPoints: string[]
  targetingStrategy: string
}

type Evaluation = TargetAudienceEvaluation[]

interface TargetAudience {
  id: string
  segment: string
  description: string
  challenges: string[]
}

const ResponseSchema = z.object({
  target_audiences: z.array(
    z.object({
      id: z.string(),
      why: z.string(),
      pain_points: z.array(z.string()),
      targeting_strategy: z.string(),
    })
  ),
})

export class TargetAudiencesEvaluator {
  static className = 'TargetAudiencesEvaluator'
  static prompt = '00-target-audiences-evaluation'
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
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', TargetAudiencesEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(TargetAudiencesEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${TargetAudiencesEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: TargetAudiencesEvaluator.model,
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
                text: this.buildUserMessage(problem, targetAudiences),
              },
            ],
          },
        ],
        top_p: TargetAudiencesEvaluator.nucleusSampling,
        max_completion_tokens: TargetAudiencesEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'target_audiences'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${TargetAudiencesEvaluator.className} called`,
        data: {
          model: TargetAudiencesEvaluator.model,
          top_p: TargetAudiencesEvaluator.nucleusSampling,
          max_completion_tokens: TargetAudiencesEvaluator.maxCompletionTokens,
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

      const audiences = message.parsed.target_audiences

      return audiences.map((targetAudience) => ({
        id: targetAudience.id,
        why: targetAudience.why,
        painPoints: targetAudience.pain_points,
        targetingStrategy: targetAudience.targeting_strategy,
      }))
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }

  private buildUserMessage(
    problem: string,
    targetAudiences: TargetAudience[]
  ): string {
    return `Here is the problem my product aims to solve: """
${problem.trim()}"""

Here are my potential target audiences: """
${targetAudiences
  .map((targetAudience) => {
    let content = ''

    content += `Segment ID: ${targetAudience.id}\n`
    content += `Segment: ${targetAudience.segment}\n`
    content += `Description: ${targetAudience.description}\n`
    content += `Challenges: ${targetAudience.challenges.join('; ')}\n`

    return content
  })
  .join('\n\n')}
"""`
  }
}
