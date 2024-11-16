import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

type Status = 'well-defined' | 'requires_changes' | 'not-well-defined'

interface Evaluation {
  status: Status
  suggestions: string[]
  recommendations: string[]
  painPoints: string[]
  marketExistence: string
  targetAudience: TargetAudience[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

const ResponseSchema = z.object({
  problem_evaluation: z.object({
    status: z.enum(['well-defined', 'requires_changes', 'not-well-defined']),
    suggestions: z.array(z.string()),
    recommendations: z.array(z.string()),
    pain_points: z.array(z.string()),
    market_existence: z.string(),
    target_audience: z.array(
      z.object({
        segment: z.string(),
        description: z.string(),
        challenges: z.array(z.string()),
      })
    ),
  }),
})

export class ConceptEvaluator {
  static className = 'ConceptEvaluator'
  static prompt = '00-problem-evaluation'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 3000

  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateConcept(
    conceptId: string,
    problem: string
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', ConceptEvaluator.className)
    Sentry.setTag('concept_id', conceptId)

    try {
      const promptContent = getPromptContent(ConceptEvaluator.prompt)

      if (!promptContent) {
        throw new Error(`Prompt content ${ConceptEvaluator.prompt} not found`)
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: ConceptEvaluator.model,
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
                text: problem.trim(),
              },
            ],
          },
        ],
        top_p: ConceptEvaluator.nucleusSampling,
        max_completion_tokens: ConceptEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(
          ResponseSchema,
          'problem_evaluation'
        ),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${ConceptEvaluator.className} called`,
        data: {
          model: ConceptEvaluator.model,
          top_p: ConceptEvaluator.nucleusSampling,
          max_completion_tokens: ConceptEvaluator.maxCompletionTokens,
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

      const problemEvaluation = message.parsed.problem_evaluation

      return {
        status: problemEvaluation.status,
        suggestions: problemEvaluation.suggestions,
        recommendations: problemEvaluation.recommendations,
        painPoints: problemEvaluation.pain_points,
        marketExistence: problemEvaluation.market_existence,
        targetAudience: problemEvaluation.target_audience,
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
