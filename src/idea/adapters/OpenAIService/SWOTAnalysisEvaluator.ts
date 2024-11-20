import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface Evaluation {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface ValueProposition {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

const ResponseSchema = z.object({
  swot_analysis: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(
      z.object({
        description: z.string(),
        action: z.string(),
      })
    ),
    opportunities: z.array(z.string()),
    threats: z.array(
      z.object({
        description: z.string(),
        action: z.string(),
      })
    ),
  }),
})

export class SWOTAnalysisEvaluator {
  static className = 'SWOTAnalysisEvaluator'
  static prompt = '00-swot-analysis'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateSWOTAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', SWOTAnalysisEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(SWOTAnalysisEvaluator.prompt)

      if (!promptContent) {
        throw new Error(
          `Prompt content ${SWOTAnalysisEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: SWOTAnalysisEvaluator.model,
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
"""

And here is my value proposition:
- Main benefit: ${valueProposition.mainBenefit}
- Problem solving: ${valueProposition.problemSolving}
- Differentiation: ${valueProposition.differentiation}`,
              },
            ],
          },
        ],
        top_p: SWOTAnalysisEvaluator.nucleusSampling,
        max_completion_tokens: SWOTAnalysisEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(ResponseSchema, 'swot_analysis'),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${SWOTAnalysisEvaluator.className} called`,
        data: {
          model: SWOTAnalysisEvaluator.model,
          top_p: SWOTAnalysisEvaluator.nucleusSampling,
          max_completion_tokens: SWOTAnalysisEvaluator.maxCompletionTokens,
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

      const swotAnalysis = message.parsed.swot_analysis

      return {
        strengths: swotAnalysis.strengths,
        weaknesses: swotAnalysis.weaknesses.map(
          (weakness) => `${weakness.description} Action: ${weakness.action}`
        ),
        opportunities: swotAnalysis.opportunities,
        threats: swotAnalysis.threats.map(
          (threat) => `${threat.description} Action: ${threat.action}`
        ),
      }
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
