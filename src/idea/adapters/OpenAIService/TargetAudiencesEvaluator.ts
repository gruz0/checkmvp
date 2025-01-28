import { z } from 'zod'
import { BaseEvaluator } from './BaseEvaluator'

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

export class TargetAudiencesEvaluator extends BaseEvaluator<
  z.infer<typeof ResponseSchema>,
  Evaluation
> {
  protected get className() {
    return 'TargetAudiencesEvaluator'
  }
  protected get promptName() {
    return '00-target-audiences-evaluation'
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
    return 'target_audiences'
  }

  async evaluateTargetAudiences(
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
            text: this.buildUserMessage(problem, targetAudiences),
          },
        ],
      },
    ]

    return this.evaluate(ideaId, messages)
  }

  protected transformResponse(
    response: z.infer<typeof ResponseSchema>
  ): Evaluation {
    return response.target_audiences.map((targetAudience) => ({
      id: targetAudience.id,
      why: targetAudience.why,
      painPoints: targetAudience.pain_points,
      targetingStrategy: targetAudience.targeting_strategy,
    }))
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
