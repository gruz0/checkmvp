import * as Sentry from '@sentry/nextjs'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

type Keyword = string

type Evaluation = Keyword[]

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
  google_trends_keywords: z.array(z.string()),
})

export class GoogleTrendsKeywordsEvaluator {
  static className = 'GoogleTrendsKeywordsEvaluator'
  static prompt = '00-google-trends-keywords-evaluation'
  static model = 'gpt-4o-mini'
  static nucleusSampling = 0.9
  static maxCompletionTokens = 2000

  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateGoogleTrendsKeywords(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    Sentry.setTag('component', 'AIService')
    Sentry.setTag('ai_service_type', GoogleTrendsKeywordsEvaluator.className)
    Sentry.setTag('idea_id', ideaId)

    try {
      const promptContent = getPromptContent(
        GoogleTrendsKeywordsEvaluator.prompt
      )

      if (!promptContent) {
        throw new Error(
          `Prompt content ${GoogleTrendsKeywordsEvaluator.prompt} not found`
        )
      }

      const response = await this.openai.beta.chat.completions.parse({
        model: GoogleTrendsKeywordsEvaluator.model,
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
"""

And here is my value proposition:
- Main benefit: ${valueProposition.mainBenefit}
- Problem solving: ${valueProposition.problemSolving}
- Differentiation: ${valueProposition.differentiation}`,
              },
            ],
          },
        ],
        top_p: GoogleTrendsKeywordsEvaluator.nucleusSampling,
        max_completion_tokens:
          GoogleTrendsKeywordsEvaluator.maxCompletionTokens,
        response_format: zodResponseFormat(
          ResponseSchema,
          'google_trends_keywords'
        ),
        n: 1,
      })

      Sentry.addBreadcrumb({
        message: `OpenAI ${GoogleTrendsKeywordsEvaluator.className} called`,
        data: {
          model: GoogleTrendsKeywordsEvaluator.model,
          top_p: GoogleTrendsKeywordsEvaluator.nucleusSampling,
          max_completion_tokens:
            GoogleTrendsKeywordsEvaluator.maxCompletionTokens,
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

      return message.parsed.google_trends_keywords
    } catch (e) {
      Sentry.captureException(e)

      throw e
    }
  }
}
