import OpenAI from 'openai'
import { z } from 'zod'
import { getPromptContent } from '@/lib/prompts'

interface Evaluation {
  competitors: Competitor[]
  comparison: Comparison
  differentiationSuggestions: string[]
}

interface TargetAudience {
  segment: string
  description: string
  challenges: string[]
}

interface Competitor {
  name: string
  productName: string
  url: string
  coreFeatures: string[]
  valueProposition: string
  userAcquisition: string
  strengths: string[]
  weaknesses: string[]
  differentiationOpportunity: string
}

interface Comparison {
  strengths: string[]
  weaknesses: string[]
}

const ResponseSchema = z.object({
  competitor_analysis: z.object({
    competitors: z.array(
      z.object({
        name: z.string(),
        product_name: z.string(),
        url: z.string(),
        core_features: z.array(z.string()),
        value_proposition: z.string(),
        user_acquisition: z.string(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        differentiation_opportunity: z.string(),
      })
    ),
    comparison: z.object({
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
    }),
    differentiation_suggestions: z.array(z.string()),
  }),
})

export class CompetitorAnalysisEvaluator {
  private readonly openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async evaluateCompetitorAnalysis(
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    const promptContent = getPromptContent('00-competitor-analysis')

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
      competitors: analysis.competitor_analysis.competitors.map(
        (competitor) => ({
          name: competitor.name,
          productName: competitor.product_name,
          url: competitor.url,
          coreFeatures: competitor.core_features,
          valueProposition: competitor.value_proposition,
          userAcquisition: competitor.user_acquisition,
          strengths: competitor.strengths,
          weaknesses: competitor.weaknesses,
          differentiationOpportunity: competitor.differentiation_opportunity,
        })
      ),
      comparison: {
        strengths: analysis.competitor_analysis.comparison.strengths,
        weaknesses: analysis.competitor_analysis.comparison.weaknesses,
      },
      differentiationSuggestions:
        analysis.competitor_analysis.differentiation_suggestions,
    }
  }
}
