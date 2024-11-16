import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface Evaluation {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

const ResponseSchema = z.object({
  value_proposition: z.object({
    main_benefit: z.string(),
    problem_solving: z.string(),
    differentiation: z.string(),
  }),
})

export class ValuePropositionEvaluator {
  static className = 'ValuePropositionEvaluator'
  static prompt = '00-value-proposition-evaluation'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateValueProposition(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', ValuePropositionEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(ValuePropositionEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${ValuePropositionEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: ValuePropositionEvaluator.model,
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
        top_p: ValuePropositionEvaluator.nucleusSampling,
        max_completion_tokens: ValuePropositionEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'value_proposition'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${ValuePropositionEvaluator.className} called`,
        data: {
          model: ValuePropositionEvaluator.model,
          top_p: ValuePropositionEvaluator.nucleusSampling,
          max_completion_tokens: ValuePropositionEvaluator.maxCompletionTokens,
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

      const valueProposition = message.parsed.value_proposition

      return {
        mainBenefit: valueProposition.main_benefit,
        problemSolving: valueProposition.problem_solving,
        differentiation: valueProposition.differentiation,
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
