import OpenAI from 'openai'
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
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateTargetAudience(
    problem: string,
    segment: string,
    description: string,
    challenges: string[]
  ): Promise<Evaluation> {
    const promptContent = getPromptContent('00-target-audience-evaluation')

    if (!promptContent) {
      throw new Error('Prompt content not found')
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
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
      // For most factual use cases such as data extraction, and truthful Q&A, the temperature of 0 is best.
      // https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
      temperature: 0.7,
      max_tokens: 2000,
      response_format: {
        type: 'json_object',
      },
    })

    // TODO: Store response.usage for better analysis

    const content = response.choices[0].message.content ?? ''

    const analysis = ResponseSchema.parse(JSON.parse(content))

    return {
      why: analysis.target_audience.why,
      painPoints: analysis.target_audience.pain_points,
      targetingStrategy: analysis.target_audience.targeting_strategy,
    }
  }
}
