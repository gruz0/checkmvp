import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

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

export class ValuePropositionEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'ValuePropositionEvaluator'
  }
  protected get promptName() {
    return '00-value-proposition-evaluation'
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
    return 'value_proposition'
  }

  async evaluateValueProposition(
    ideaId: string,
    problem: string,
    targetAudiences: TargetAudience[]
  ): Promise<Evaluation> {
    const messages = [
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
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
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return {
      mainBenefit: response.value_proposition.main_benefit,
      problemSolving: response.value_proposition.problem_solving,
      differentiation: response.value_proposition.differentiation,
    }
  }
}
