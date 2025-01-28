import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

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

export class SWOTAnalysisEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'SWOTAnalysisEvaluator'
  }
  protected get promptName() {
    return '00-swot-analysis'
  }
  protected get model() {
    return 'gpt-4o-mini'
  }
  protected get nucleusSampling() {
    return 0.9
  }
  protected get maxCompletionTokens() {
    return 2000
  }
  protected get responseSchema() {
    return ResponseSchema
  }
  protected get responseKey() {
    return 'swot_analysis'
  }

  async evaluateSWOTAnalysis(
    ideaId: string,
    problem: string,
    marketExistence: string,
    targetAudiences: TargetAudience[],
    valueProposition: ValueProposition
  ): Promise<Evaluation> {
    const messages = [
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
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
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      strengths: response.swot_analysis.strengths,
      weaknesses: response.swot_analysis.weaknesses.map(
        (weakness) => `${weakness.description} Action: ${weakness.action}`
      ),
      opportunities: response.swot_analysis.opportunities,
      threats: response.swot_analysis.threats.map(
        (threat) => `${threat.description} Action: ${threat.action}`
      ),
    }
  }
}
