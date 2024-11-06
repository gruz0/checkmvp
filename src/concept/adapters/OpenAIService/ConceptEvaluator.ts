import OpenAI from 'openai'
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
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateConcept(problem: string): Promise<Evaluation> {
    const promptContent = getPromptContent('00-problem-evaluation')

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
${problem.trim()}"""`,
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
      status: analysis.problem_evaluation.status,
      suggestions: analysis.problem_evaluation.suggestions,
      recommendations: analysis.problem_evaluation.recommendations,
      painPoints: analysis.problem_evaluation.pain_points,
      marketExistence: analysis.problem_evaluation.market_existence.trim(),
      targetAudience: analysis.problem_evaluation.target_audience,
    }
  }
}
